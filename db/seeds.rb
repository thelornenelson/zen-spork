# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'
require 'faker'

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


puts "Creating Users ..."

user1 = User.create first_name: 'Testfirst', last_name: 'Testlast', email: 'test@test.test'

## Recipes

puts "Creating Recipes ..."

def generate_recipe_content

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

  recipe = { intro: Faker::Food.dish + " " + Faker::Hipster.sentence,
    gear: Faker::Hipster.words(3, true, true),
    warnings: Faker::Hipster.sentence,
    prep_time: "#{Faker::Number.between(10, 45)} minutes",
    cook_time: "#{Faker::Number.between(10, 45)} minutes",
    servings: "serves #{Faker::Number.between(1, 6)}",
    steps: steps
  }

end

recipe1_content = generate_recipe_content

recipe2_content = generate_recipe_content

recipe1 = user1.recipes.create(title: Faker::Food.dish, content: JSON.generate(recipe1_content), note: 'An optional note for this recipe', photo_url: 'https://www.fillmurray.com/175/175.png')
recipe2 = user1.recipes.create(title: Faker::Food.dish, content: JSON.generate(recipe2_content), photo_url: 'https://www.fillmurray.com/175/175.png')

puts "Generating sporks"


# Easiest to create sporks using assocaition with original recipe, to avoid having to do original_recipe_id: original_recipe.id

recipe1.sporks.create(user: user1, recipe: recipe2)

puts "DONE!"
