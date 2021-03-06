require 'json-diff'


# JsonDiff.diff(@orec.content, @rec.content, include_was: true, additions: true)
class SporksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    respond_to do |format|
      format.html do
        @sporks = Spork.all
        @recipe_diffs = []

        @sporks.each do |spork|
          @recipe_diffs.push RecipeDiff.new(spork)
        end
        render :index
      end
      format.json do
        render json: Recipe.find(params[:recipe_id]).sporks
      end
    end
  end

  def create
    # POST /recipes/:recipe_id/sporks
    # for now, we only have 1 user who creates all recipes. Eventually this will be changed to reflect the current user

    begin
      @user = current_user
      @original_recipe = Recipe.find(params[:recipe_id])

      @recipe = @original_recipe.dup
      @recipe.user = @user

      @spork = @original_recipe.sporks.new
      @spork.recipe = @recipe
      @spork.user = @user

      if @recipe.save
        if @spork.save
          response.headers["Recipe-Id"] = @recipe.id
          head :created, location: recipe_path(@recipe, format: :json)
        else
          @recipe.destroy
          render plain: 'ERROR: FAILED TO SPORK', status: 400
        end
      else
        render plain: 'ERROR: FAILED TO DUPLICATE RECIPE', status: 400
      end
    rescue
      render plain: "ERROR: CANNOT FIND RECIPE WITH ID #{params[:recipe_id]}" , status: 400
    end

  end
end
