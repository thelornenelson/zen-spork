# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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


puts "Creating Users ..."

user1 = User.create first_name: 'Testfirst', last_name: 'Testlast', email: 'test@test.test', password: 'testing'

## Recipes

puts "Creating Recipes ..."


recipe1_content = { intro: 'Summary, description, overview, that kind of thing.',
  gear: ['Special', 'Tools', 'As Required'],
  warnings: 'important information that user should be aware of',
  prep_time: '30 minutes',
  cook_time: '1-2 hours',
  servings: 'serves 3',
  steps:[
    {
      instructions: 'Text instructions associated with the first step',
      ingredients: [
        {
          qty: 5,
          unit: 'cups',
          name: 'name of ingredient'
        },
        {
          qty: 3,
          unit: 'tablespoons',
          name: 'name of second ingredient'
        }
      ]
    },
    {
      instructions: 'Text instructions associated with the second step',
      ingredients: [
        {
          qty: 5,
          unit: 'pounds',
          name: 'name of third ingredient'
        }
      ]
    },
    {
      instructions: 'Instructions for a step without any ingredients',
      ingredients: []
    }
  ]
}

recipe2_content = { intro: 'A sporked recipe, great for entertaining, or romantic nights alone',
  gear: ['Hammer', 'Nail', 'Fillet Knife'],
  warnings: 'Not for human consumption. Consult your lawyer before reading.',
  prep_time: '25 to life',
  cook_time: '1-2 hours',
  servings: 'serves 3',
  steps:[
    {
      instructions: 'Text instructions associated with the first step',
      ingredients: [
        {
          qty: 5,
          unit: 'cups',
          name: 'name of ingredient'
        },
        {
          qty: 3,
          unit: 'tablespoons',
          name: 'name of second ingredient'
        }
      ]
    },
    {
      instructions: 'Text instructions associated with the second step',
      ingredients: [
        {
          qty: 5,
          unit: 'pounds',
          name: 'name of third ingredient'
        }
      ]
    },
    {
      instructions: 'Instructions for a step without any ingredients',
      ingredients: []
    }
  ]
}

recipe1 = user1.recipes.create(title: 'Excellent Example Eggs', content: JSON.generate(recipe1_content), note: 'An optional note for this recipe', photo_url: 'https://www.fillmurray.com/175/175.png')
recipe2 = user1.recipes.create(title: 'Sporked Example Eggs', content: JSON.generate(recipe2_content), photo_url: 'https://www.fillmurray.com/175/175.png')

puts "Generating sporks"


# Easiest to create sporks using assocaition with original recipe, to avoid having to do original_recipe_id: original_recipe.id

recipe1.sporks.create(user: user1, recipe: recipe2)

puts "DONE!"
