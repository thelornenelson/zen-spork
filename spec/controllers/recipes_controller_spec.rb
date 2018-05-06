require 'rails_helper'

RSpec.describe RecipesController, type: :controller do

  before :each do
    @user = User.create(first_name: "Testfirst")
  end


  describe "GET #index" do
    it "returns http code 200 (ok)" do
      get :index
      expect(response).to have_http_status(200)
    end
  end

  describe "GET #show" do
    it "returns http 200 (ok)" do
      user_with_recipes = create(:user_with_recipes, recipes_count: 10)
      get :show, params: { id: user_with_recipes.recipes[0].id, format: :json  }
      expect(response).to have_http_status(200)
    end
  end

end
