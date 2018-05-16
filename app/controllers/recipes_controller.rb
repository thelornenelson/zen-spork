class RecipesController < ApplicationController
  # We'll need to use the cross-site forgery token with our form and submit with our post requests
  skip_before_action :verify_authenticity_token
  before_action :parse_ingredients_strings, only: [:create, :update]

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
    @user = current_user
    @recipe = @user.recipes.new(recipe_params)

    if @recipe.save
      head :created, location: recipe_path(@recipe, format: :json)
    else
      render plain: 'ERROR: FAILED TO SAVE', status: 400
    end
  end

  def update
    @user = current_user
    @recipe = Recipe.find(params[:id])
    if @recipe.user == @user
      if @recipe.update(recipe_params)
        head :ok, location: recipe_path(@recipe, format: :json)
      else
        render plain: 'ERROR: FAILED TO SAVE', status: 400
      end
    else
      render plain: 'ERROR: UNAUTHORIZED', status: 400
    end
  end

  private

    def recipe_params
      params.require(:recipe).permit(
        :title,
        :note,
        :photo_url,
        :reference_url,
        content: [
          :intro,
          { gear: [] },
          :warnings,
          :prep_time,
          :cook_time,
          :servings,
          { steps: [
            :instructions,
            { ingredients: [] },
            { ingredients: [
             :qty,
             :unit,
             :name
             ] }
           ],
            }
        ]
      )

    end

    def parse_ingredients_strings
      begin
        # destructively map the steps and ingredients so these changes are saved to the original array
        params[:recipe][:content][:steps].map! do |recipe_step|
          recipe_step[:ingredients].map! do |ingredient|
            # Assume the input is in the format '1 cup extra pure water' where qty = '1', unit = 'cup', name = 'extra pure water'
            # Will handle mixed fractions such as 1 1/2 cup flour. Additional spaces between qty, unit, and name will be ignored but there must be 1 space between the number and the fraction (1    1/2 will get interpreted incorrectly).
            # 1 avocado will get interpreted as qty = '1', name = 'avocado'
            # 'salt and pepper to taste' will be interpreted as name = 'salt and pepper to taste'
            parsed_ingredient = nil
            if ingredient.is_a? String
              ingredient_parser = /((?<qty>(^[[:digit:]]* ?[[:digit:]]+ ?[\/-] ?[[:digit:]]+)|(^[[:digit:]]+\.?[[:digit:]]*)) *)?((?<unit>(?<!^)[[:alpha:]]+) +)?(?<name>.+)?/
              matches = ingredient_parser.match(ingredient.strip)
              parsed_ingredient = { qty: (matches[:qty] || "") , unit: ( matches[:unit] || "") , name: matches[:name] || "" }
            end
            parsed_ingredient || ingredient
          end
          # instructions just get repeated unchanged,
          { instructions: recipe_step[:instructions], ingredients: recipe_step[:ingredients]}
        end
      rescue => error
        puts 'Error parsing ingredient strings'
        p error
      end
    end

end
