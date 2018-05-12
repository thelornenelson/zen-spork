require 'rails_helper'

RSpec.describe RecipesController, type: :controller do

  describe "GET #index" do
    it "should return http code 200 (ok) when format is default" do
      get :index
      expect(response).to have_http_status(200)
    end

    # render_views will make rspec render the actual json so we can test it against expected values
    render_views
    subject(:json) { JSON.parse(response.body, symbolize_names: true) }
    context "format is json" do

      it "should return http code 200 (ok)" do
        get :index, format: :json
        expect(response).to have_http_status(200)
      end

      it "should return json content type" do
        get :index, format: :json
        expect(response.content_type).to eq "application/json"
      end

      it "should return json array with all recipes" do
        recipe_count = 10
        create(:user_with_recipes, recipes_count: recipe_count)
        get :index, format: :json
        expect(json.length).to eq recipe_count
        expect(json[0][:title]).to include Recipe.first.title
      end
    end
  end


  render_views
  subject(:json) { JSON.parse(response.body, symbolize_names: true) }
  describe "GET #show with format type json" do

    before :each do
      user_with_recipes = create(:user_with_recipes, recipes_count: 10)
      @id_to_test = user_with_recipes.recipes.first.id
      get :show, params: { id: @id_to_test, format: :json  }
    end

    it "should return http 200 (ok)" do
      expect(response).to have_http_status(200)
    end

    it "should return correct title" do
      expect(json[:title]).to include Recipe.find(@id_to_test).title
    end

    it "should return correct number of recipe steps" do
      expected_length = Recipe.find(@id_to_test).content["steps"].length
      expect(json[:content][:steps].length).to eq expected_length
    end
  end

  describe "POST #create" do
    before :each do
      user = create(:user)
      request.session[:user_id]=user.id
    end

    it "should return 400 status when given invalid data" do
      post :create, format: :json, params: {recipe: { title: "", content: '' } }
      expect(response).to have_http_status(400)
    end
    context "with valid recipe data" do

      it "should return 201 status" do

        post :create, format: :json, params: {recipe: { title: "Title", content: FactoryBot.generate_recipe_content } }
        expect(response).to have_http_status(201)
      end

      it "should create a new recipe" do
        expected_count = Recipe.all.count + 1
        post :create, format: :json, params: {recipe: { title: "Title", content: FactoryBot.generate_recipe_content } }
        expect(Recipe.all.count).to eq expected_count
      end

      it "should assign new recipe to current user" do
        post :create, format: :json, params: {recipe: { title: "Title", content: FactoryBot.generate_recipe_content } }
        # This should be updated when we implement sessions - for now we only have 1
        expect(Recipe.last.user.id).to eq User.first.id
      end
    end
  end

  #created recipe can be retreived with id
  #created recipe matches creation request

end
