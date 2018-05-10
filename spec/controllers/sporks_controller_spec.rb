require 'rails_helper'

RSpec.describe SporksController, type: :controller do

  # render_views will make rspec render the actual json so we can test it against expected values
  render_views
  subject(:json) { JSON.parse(response.body, symbolize_names: true) }
  describe "GET /recipes/:recipe_id/sporks/#index and format is json" do
    before :each do
      @user = create(:user_with_recipes, recipes_count: 1)
      @original_recipe = @user.recipes.first
      user2 = create(:user, first_name: 'TestSecond', last_name: 'TestLast', email: 'test2@test.test', password: 'testing')
      spork = create(:spork, original_recipe: @original_recipe, user: user2)
    end

    it "should return http code 200 (ok)" do
      get :index, format: :json, params: { recipe_id: @original_recipe.id }
      expect(response).to have_http_status(200)
    end

    it "should return json content type" do
      get :index, format: :json, params: { recipe_id: @original_recipe.id }
      expect(response.content_type).to eq "application/json"
    end

    it "should return json array with all sporks for the current recipe" do
      get :index, format: :json, params: { recipe_id: @original_recipe.id }
      expect(json.length).to eq @user.recipes.find(@original_recipe.id).sporks.count
      # expect(json[0][:title]).to include Recipe.first.title
    end

    it "should increase length of json array by 1 when a new spork is created" do
      original_count = @user.recipes.find(@original_recipe.id).sporks.count
      user3 = create(:user, first_name: 'TestThird', last_name: 'TestLast', email: 'test3@test.test', password: 'testing')
      spork = create(:spork, original_recipe: @original_recipe, user: user3)

      get :index, format: :json, params: { recipe_id: @original_recipe.id }
      expect(json.length).to eq (original_count + 1)

    end
  end

  describe "POST #create" do

    before :each do
      @user = create(:user_with_recipes, recipes_count: 1)
      @original_recipe = @user.recipes.first
    end

    it "should return 400 status when given invalid id" do
      post :create, format: :json, params: {recipe_id: 'invalid' }
      expect(response).to have_http_status(400)
    end

    context "with valid recipe data" do

      it "should return 201 status" do
        post :create, format: :json, params: {recipe_id: @user.recipes.first.id }
        expect(response).to have_http_status(201)
      end

      it "should create a new spork" do
        expected_count = @original_recipe.sporks.count + 1
        post :create, format: :json, params: {recipe_id: @original_recipe.id }
        expect(@original_recipe.sporks.count).to eq expected_count
      end
    end
  end
end
