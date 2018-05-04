require 'rails_helper'

RSpec.describe Recipe, type: :model do
  subject {
    described_class.new(title: "Recipe title", user_id: 1)
  }
  describe 'validations' do
    it 'is valid with valid attributes' do
      # @recipe = Recipe.create!(title: "Recipe title")
      expect(subject).to be_valid
    end
  end

  
end


#  id | user_id | content | note | proto_url | created_at | updated_at 