# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# require 'factory_bot_rails'
# require 'faker'
require 'json'

puts "Seeding Data ..."

# # Only run on development (local) instances not on production, etc.
# unless Rails.env.development?
#   puts "Development seeds only (for now)!"
#   exit 0
# end

## Clean out old records

Spork.destroy_all
Recipe.destroy_all
User.destroy_all


puts "Creating Users and Recipes..."

user1 = User.create(first_name: "Craig", last_name: "Rice", email: "craig@craig.craig", password: "password")
user2 = User.create(first_name: "Andrew", last_name: "Barclay", email: "andrew@andrew.andrew", password: "password")




def spork (original_recipe, user)
  puts 'Spork!'
  recipe_sporked = original_recipe.dup
  recipe_sporked.title = "Sporked #{recipe_sporked.title}"
  recipe_sporked.content['intro'] = "Sporked #{recipe_sporked.content['intro']}"
  recipe_sporked.content['steps'][0]['ingredients'][0] = { qty: 1, unit: 'gallon', name: 'sporks' }
  recipe_sporked.user = user
  recipe_sporked.save

  spork = original_recipe.sporks.new(user: user, recipe: recipe_sporked)
  spork.save
end

spork user1.recipes[0], user2
spork user1.recipes[3], user2
spork user1.recipes[5], user2
spork user1.recipes[6], user2
spork user1.recipes[5], user3
spork user1.recipes[6], user3
spork user1.recipes[7], user3


puts "DONE!"





# FactoryBot.define do
#   factory :recipe do
#     user
#     title { Faker::Food.dish }
#     photo_url { (["", "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&h=350"].sample) }
#     # see ../helper/factory_bot.rb
#     content { generate_recipe_content(title) }
#   end

#   factory :user do
#     first_name "Testfirst"
#     last_name "Test_last"
#     email "test@test.test"
#     password "testing"

#     # user_with_recipes will create recipe data after the user has been created
#     factory :user_with_recipes do

#       # recipes_count is declared as a transient attribute and available in
#       # attributes on the factory, as well as the callback via the evaluator
#       transient do
#         recipes_count 5
#       end

#       # the after(:create) yields two values; the user instance itself and the
#       # evaluator, which stores all values from the factory, including transient
#       # attributes; `create_list`'s second argument is the number of records
#       # to create and we make sure the user is associated properly to the recipe
#       after(:create) do |user, evaluator|
#         create_list(:recipe, evaluator.recipes_count, user: user)
#       end
#     end
#   end
# end





module FactoryBot
  module Syntax
    module Methods
      def generate_recipe_content(title = Faker::Food.dish)

        steps = []

        Random.rand(1..6).times do
          step = {}
          # add 1-4 sentences of instructions.
          step[:instructions] = Faker::Hipster.paragraph(1,false,3)
          step[:ingredients] = []

          # add 0-6 ingredients
          Random.rand(0..6).times do
            measurement = Faker::Food.measurement.split(' ')
            ingredient = {
              qty: measurement[0],
              unit: measurement[1],
              name: Faker::Food.ingredient
            }
            step[:ingredients].push ingredient
          end

          steps.push step
        end

        recipe = { intro: "#{title} #{Faker::Hipster.sentence}",
          gear: Faker::Hipster.words(3, true, true),
          warnings: Faker::Hipster.sentence,
          prep_time: "#{Faker::Number.between(10, 45)} minutes",
          cook_time: "#{Faker::Number.between(10, 45)} minutes",
          servings: "serves #{Faker::Number.between(1, 6)}",
          steps: steps
        }

      end
    end
  end
end
