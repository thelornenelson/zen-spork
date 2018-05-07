class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
  end

  def create

    puts "!!!!!!!!!!!!"
    users_email = params[:email]

    puts params[:email]
    puts users_email

    @user = User.find_by_email(users_email)

    if !@user
      session[:user_id] = nil
      redirect_to '/login'
    else
      session[:user_id] = @user.id
      redirect_to '/'
    end

  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end
end
