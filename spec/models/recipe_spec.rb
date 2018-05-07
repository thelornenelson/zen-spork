require 'rails_helper'
require 'database_cleaner'

RSpec.describe Recipe, type: :model do
  subject(:user) {User.new()}
  subject(:recipe) {user.recipes.new(title: "recipeTitle", content: '{"servings":"serves 5","prep_time":"5 minutes","cook_time":"5 minutes","steps":["step1", "step2"]}')}

  describe 'validations' do

    it 'should be valid with valid attributes' do
      expect(recipe).to be_valid
    end

    it 'should not be valid if title is missing' do
      recipe.title = nil
      expect(recipe).to_not be_valid
    end

    it 'should not be valid if content is nil' do
      recipe.content = nil
      expect(recipe).to_not be_valid
    end

    it 'should not be valid with 0 steps' do
      recipe.content = '{"steps":[]}'
      expect(recipe).to_not be_valid
    end

    it 'should not be valid if servings are missing' do
      recipe.content = '{"prep_time":"5 minutes","cook_time":"5 minutes","steps":["step1", "step2"]}'
      expect(recipe).to_not be_valid
    end

    it 'should not be valid if prep time is missing' do
      recipe.content = '{"servings":"serves 5","cook_time":"5 minutes","steps":["step1", "step2"]}'
      expect(recipe).to_not be_valid
    end

    it 'should not be valid if cook time is missing' do
      recipe.content = '{"servings":"serves 5","prep_time":"5 minutes","steps":["step1", "step2"]}'
      expect(recipe).to_not be_valid
    end

    # it 'should not be valid if content is not parsable JSON' do
    #   recipe.content = '{"servings":"serves 5""prep_time":"5 minutes","cook_time":"5 minutes","steps":["step1", "step2"]}'
    #   expect(recipe).to_not be_valid
    # end

    it 'should not be valid if steps is missing' do
      recipe.content = '{}'
      expect(recipe).to_not be_valid
    end

    it 'should be valid if image url is blank' do
      expect(recipe).to be_valid
    end

    it 'should be valid if image url is a valid image url' do
      recipe.photo_url = "https://www.fillmurray.com/200/300.jpg"
      expect(recipe).to be_valid
    end

    it 'should not be valid if image url is an invalid image url' do
      recipe.photo_url = "Not a url"
      expect(recipe).to_not be_valid
    end

  end
end
