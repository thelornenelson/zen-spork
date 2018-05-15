class SporkSerializer < ActiveModel::Serializer
  attributes :id, :recipe_id, :original_recipe_id, :recipe_diffs

end
