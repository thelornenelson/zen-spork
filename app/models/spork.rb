require 'json-diff'
require 'json'
require 'pp'

class Spork < ApplicationRecord
  belongs_to :user
  belongs_to :recipe
  belongs_to :original_recipe, class_name: "Recipe", foreign_key: "original_recipe_id"

  def recipe_diffs
    @recipe_diffs = self.recipe.dup
    @recipe_diffs.content = RecipeDiff.new(self).marked_up
    @recipe_diffs.id = self.recipe.id
    @recipe_diffs
  end

  def similarity
    self.recipe.similarity
  end
end

# inserts a value into a hash, adding hash objects with new keys if required.
# where is an array of keys (or indices). Value is the value to ultimately insert.
# myhash.bury(['a', 2], 'new value')
class Hash
  def bury(where, value)
      me=self
      where[0..-2].each{|key|
        if me[key].nil?
          me[key] = {}
          me = me[key]
        else
          me = me[key]
        end
      }
      me[where[-1]]=value
  end
end

class RecipeDiff
  attr_reader :marked_up

  def initialize(spork)

    diffs =  JsonDiff.diff(spork.original_recipe.content, spork.recipe.content, include_was: true, additions: true, moves: true)
    @marked_up = spork.recipe.content.dup

    # There is a bug where sometimes a removed step + and added step is interpreted as a replace + move. To correctly map the indices we need to translate where the items were moved to/from
    # @move_map = []
    #
    # diffs.reverse.each do |diff|
    #
    #   if diff['op'] == 'move'
    #     from = generate_bury_array diff['from']
    #     path = generate_bury_array diff['path']
    #     @move_map[]
    #   end
    # #   --------- DIFF 10 ---------
    # # {"op"=>"move", "from"=>"/steps/1", "path"=>"/steps/2"}
    # # --------- DIFF 11 ---------
    # # {"op"=>"move", "from"=>"/steps/1", "path"=>"/steps/3"}
    # # --------- DIFF 12 ---------
    # # {"op"=>"move", "from"=>"/steps/2", "path"=>"/steps/4"}
    # # --------- DIFF 13 ---------
    # # {"op"=>"move", "from"=>"/steps/3", "path"=>"/steps/5"}
    # # --------- DIFF 14 ---------
    # # {"op"=>"move", "from"=>"/steps/4", "path"=>"/steps/6"}
    # # --------- DIFF 15 ---------
    # # {"op"=>"move", "from"=>"/steps/5", "path"=>"/steps/7"}
    # # --------- DIFF 16 ---------
    # # {"op"=>"move", "from"=>"/steps/6", "path"=>"/steps/8"}
    # # --------- DIFF 17 ---------
    # # {"op"=>"move", "from"=>"/steps/7", "path"=>"/steps/9"}
    # # --------- DIFF 18 ---------
    # # {"op"=>"move", "from"=>"/steps/8", "path"=>"/steps/10"}
    # # --------- DIFF 19 ---------
    # # {"op"=>"move", "from"=>"/steps/9", "path"=>"/steps/1"}
    # end

    # diffs.each_with_index do |diff, index|
    #   puts "--------- DIFF #{index + 1} ---------"
    #   pp diff
    # end

    # first do non-destructive processing
    diffs.each do |diff|
      self.process_diff(diff) unless diff['op'] == 'remove'
    end

    # then process remove actions, which add new array elements and disrupt the diff array index references
    diffs.each do |diff|
      self.process_diff(diff) if diff['op'] == 'remove'
    end

  end

  def generate_bury_array(path)
    split_path = path.split('/')
    bury_array = []
    split_path.each do |key|
      begin
        # try and convert key to an integer and if successful, push to bury_array
        bury_array.push Integer(key)
      rescue
        # if it cannot be converted (ie is a non-numeric string), just push the string. Ignore blank strings.
        bury_array.push key unless key == ''
      end
    end
    bury_array
  end

  def process_diff(diff)
    bury_array = self.generate_bury_array(diff['path'])

    if bury_array.include? 'steps'
      if diff['op'] == 'add'
        puts "Adding"
        pp bury_array
        @marked_up.bury([*bury_array, 'was'], nil)
        unless bury_array.include? 'ingredients'
          # if it doesn't include 'ingredient', it's a new step, so we need to make sure all new ingredients also get marked as additions
          ingredients = @marked_up.dig(*bury_array)['ingredients']
          ingredients.each { |ingredient| ingredient['was'] = nil }
        end
      elsif diff['op'] == 'replace'
        puts "Replacing"
        if bury_array.include? 'ingredients'
          @marked_up.bury(bury_array.insert(-2, 'was'), diff['was'])
        else
          # not ingredient, so at the point it's an instructions change
          @marked_up.bury([*bury_array[0..-2], 'was'], diff['was'])
        end
      elsif diff['op'] == 'remove'
        puts "Removing"
        old_array = @marked_up
        bury_array[0..-2].each do |key|
          old_array = old_array[key]
        end
        @marked_up.bury(bury_array[0..-2], old_array.insert(bury_array[-1], {'was' => diff['was']}))
      end
    end
  end

end
