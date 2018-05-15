require 'faker'

FactoryBot.define do

  factory :spork do
    user
    original_recipe_id { original_recipe.id }
    recipe {
      recipe = Recipe.find(original_recipe_id).dup
      recipe.user = user
      recipe.title = "Sporked #{recipe.title}"
      recipe.save!
      recipe
    }
  end
end
