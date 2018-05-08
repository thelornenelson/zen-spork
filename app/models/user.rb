class User < ApplicationRecord

  has_secure_password

  has_many :recipes
  has_many :sporks

  def self.authenticate_with_credentials(email, password)
    @user = User.find_by_email(email)
      if @user && @user.authenticate(password)
        @user
      else
        nil
      end
    end
end

