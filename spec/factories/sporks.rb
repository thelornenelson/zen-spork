require 'faker'

FactoryBot.define do

  factory :spork do
    user
    original_recipe_id { original_recipe.id }
    recipe {
      recipe = original_recipe.dup
      recipe.user = user
      recipe.title = "Sporked #{recipe.title}"[0..29]
      recipe.save!
      recipe
    }
  end
end
