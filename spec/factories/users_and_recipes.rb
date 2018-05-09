require 'faker'
require_relative '../helpers/factory_bot'

FactoryBot.define do
  factory :recipe do
    user
    title { Faker::Food.dish }
    photo_url { (["", "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&h=350"].sample) }
    # see ../helper/factory_bot.rb
    content { generate_recipe_content(title) }
  end

  factory :user do
    first_name "Testfirst"
    last_name "Test_last"
    email "test@test.test"
    password "testing"

    # user_with_recipes will create recipe data after the user has been created
    factory :user_with_recipes do

      # recipes_count is declared as a transient attribute and available in
      # attributes on the factory, as well as the callback via the evaluator
      transient do
        recipes_count 5
      end

      # the after(:create) yields two values; the user instance itself and the
      # evaluator, which stores all values from the factory, including transient
      # attributes; `create_list`'s second argument is the number of records
      # to create and we make sure the user is associated properly to the recipe
      after(:create) do |user, evaluator|
        create_list(:recipe, evaluator.recipes_count, user: user)
      end
    end
  end
end
