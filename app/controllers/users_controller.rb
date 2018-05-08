class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
  end

  def create

    #puts "!!!!!!!!!"
    #puts params

    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to '/'
    else
      redirect_to '/signup'
    end
  end

  private
    def user_params
      params.permit(:first_name, :last_name, :email, :password)
    end
end
