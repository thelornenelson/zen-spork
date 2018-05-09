class RecipesController < ApplicationController
  # We'll need to use the cross-site forgery token with our form and submit with our post requests
  skip_before_action :verify_authenticity_token

  def index
    respond_to do |format|
        format.html { render :index }
        format.json do
          render json: Recipe.all
        end
    end
  end

  def show
    respond_to do |format|
      format.html { render plain: "Single Recipe View for Recipe ID #{params[:id]}" }
      format.json do
        render json: Recipe.find(params[:id])
      end
    end
  end

  def new
    render plain: "NEW RECIPE FORM GOES HERE"
  end

  def create
    # for now, we only have 1 user who creates all recipes. Eventually this will be changed to reflect the current user
    @user = User.first
    # recipe_data = nil
    # if recipe_params[:content][:steps][0][:ingredients][:qty].blank?
    #   recipe_data = recipe_params
    #
    #   recipe_data[:content][:steps].map! do |step|
    #     step[:ingredients].map! do |ingredient|
    #       split_ingredients = ingredient.split(' ')
    #       { qty: split_ingredients[0], unit: split_ingredients[1], name: split_ingredients[2] }
    #     end
    #     { instructions: step[:instructions], ingredients: step[:ingredients]}
    #   end
    # end

    @recipe = @user.recipes.new(recipe_params)

    if @recipe.save
      head :created, location: recipe_path(@recipe, format: :json)
    else
      render plain: 'ERROR: FAILED TO SAVE', status: 400
    end
  end

  private

    def recipe_params
      params.require(:recipe).permit(
        :title,
        :note,
        :photo_url,
        content: [
          :intro,
          { gear: [] },
          :warnings,
          :prep_time,
          :cook_time,
          :servings,
          { steps: [
            :instructions,
            { ingredients: [] }
            ],
            ingredients: [
             :qty,
             :unit,
             :name
             ]
            }
        ]
      )
    end

end
