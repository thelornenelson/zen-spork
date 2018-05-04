require 'rails_helper'
require 'database_cleaner'

RSpec.describe Recipe, type: :model do
  subject(:user) {User.new()}
  subject(:recipe) {user.recipes.new(title: "recipeTitle", content: "recipe content")}

  describe 'validations' do

    it 'is valid with valid attributes' do
      expect(recipe).to be_valid
    end

    it 'is not valid if its missing a title' do
      recipe.title = nil
      expect(recipe).to_not be_valid
    end

    it 'is not valid if its missing content - ingredients and directions' do
      recipe.content = nil
      expect(recipe).to_not be_valid
    end

  end
end