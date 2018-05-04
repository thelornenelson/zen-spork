class Spork < ApplicationRecord
  belongs_to :user
  belongs_to :recipe
  belongs_to :original_recipe, class_name: "Recipe", foreign_key: "original_recipe_id"
end
