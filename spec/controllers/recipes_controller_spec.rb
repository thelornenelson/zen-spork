require 'rails_helper'

RSpec.describe RecipesController, type: :controller do

  describe "GET #index" do
    it "returns http code 200 (ok) when format is default" do
      get :index
      expect(response).to have_http_status(200)
    end

    # render_views will make rspec render the actual json so we can test it against expected values
    render_views
    subject(:json) { JSON.parse(response.body, symbolize_names: true) }
    context "format is json" do

      it "returns http code 200 (ok)" do
        get :index, format: :json
        expect(response).to have_http_status(200)
      end

      it "returns json content type" do
        get :index, format: :json
        expect(response.content_type).to eq "application/json"
      end

      it "returns json array with all recipes" do
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

    it "returns http 200 (ok)" do
      expect(response).to have_http_status(200)
    end

    it "returns correct title" do
      expect(json[:title]).to include Recipe.find(@id_to_test).title
    end

    it "returns correct number of recipe steps" do
      expected_length = Recipe.find(@id_to_test).content["steps"].length
      expect(json[:content][:steps].length).to eq expected_length
    end
  end

  #test create
  #response code is ok
  #created recipe can be retreived with id
  #created recipe matches creation request


end
