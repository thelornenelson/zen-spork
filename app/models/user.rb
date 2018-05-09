class User < ApplicationRecord

  has_secure_password

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :password, presence: true
  validates_length_of :password, minimum: 3
  validates :first_name, presence: true
  validates :last_name, presence: true

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

