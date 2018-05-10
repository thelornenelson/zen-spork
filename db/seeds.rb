# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'factory_bot_rails'
require 'faker'
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



user1 = FactoryBot.create(:user_with_recipes, recipes_count: 10)
user2 = FactoryBot.create(:user, first_name: 'TestSecond', last_name: 'TestLast', email: 'test2@test.test', password: 'testing')
user3 = FactoryBot.create(:user, first_name: 'TestThird', last_name: 'TestLast', email: 'test3@test.test', password: 'testing')


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
