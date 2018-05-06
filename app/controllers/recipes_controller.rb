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
    @recipe = @user.recipes.new(recipe_params)
    puts "In RecipesController create"
    if @recipe.save
      redirect_to root_path
    else
      render plain: 'ERROR: FAILED TO SAVE'
    end
  end

  private

    def recipe_params
      params.require(:recipe).permit(:title, :content, :note, :photo_url)
    end

end
