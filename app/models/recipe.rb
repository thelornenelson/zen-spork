class Recipe < ApplicationRecord
  belongs_to :user
  has_one :spork
  has_many :sporks, foreign_key: "original_recipe_id"

  validates :title, presence: true
  
end
