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

puts "Creating Users and Recipes..."

user1 = User.create(first_name: "Craig", last_name: "Rice", email: "craig@craig.craig", password: "password")
user2 = User.create(first_name: "Andrew", last_name: "Barclay", email: "andrew@andrew.andrew", password: "password")
user3 = User.create(first_name: 'Elyott', last_name: 'Ryan', email: 'elyott@elyott.elyott', password: 'password')
user4 = User.create(first_name: 'Phil', last_name: 'LastName', email: 'phil@phil.phil', password: 'password')


recipe1 = Recipe.create(
  user_id: 1, 
  title: 'Miso Ramen Soup', 
  content: {
    intro: 'If you’re a ramen aficionado,  then you will have to give this quick and delicious homemade Miso Ramen recipe a try! Flavored with pork and chicken broth with a mix of toppings such as chashu, ramen egg, sweet corn kernels, nori sheet, this bowl of noodles is going to satisfy your craving.', 
    gear: [ 
      "Morter and Pestle", 
      "Two large pots", 
      "Strainer" 
    ], 
    warnings: 'Seriously tasty', 
    prep_time: '10', 
    cook_time: '15', 
    servings: '2', 
    steps: [
      {
        instructions: 'Mince the garlic, ginger, and shallot.',
        ingredients: [
          {
            qty: "2",
            unit: "cloves",
            name: "garlic"
          },
          {
            qty: "1",
            unit: "inch",
            name: "ginger"
          },
          {
            qty: "1",
            unit: "medium",
            name: "shallot"
          }
        ]
      },
      {
        instructions: 'Grind sesame seeds',
        ingredients: [
          {
            qty: "1",
            unit: "Tbsp",
            name: "sesame seeds"
          }
        ]
      },
      {
        instructions: 'In a medium pot, heat sesame oil over medium heat and cook the minced garlic, ginger, and shallot until fragrant',
        ingredients: [
          {
            qty: "1",
            unit: "Tbsp",
            name: "sesame oil"
          }
        ]
      },
      {
        instructions: 'Add the meat and increase heat to medium high. Cook the meat until no longer pink.',
        ingredients: [
          {
            qty: "113",
            unit: "g",
            name: "ground pork"
          }
        ]
      },
      {
        instructions: 'Add spicy bean paste (La Doubanjiang) and miso.',
        ingredients: [
          {
            qty: "1",
            unit: "tsp",
            name: "Chili Bean Sauce and/or Broad Bean Paste (La Doubanjiang)"
          },
          {
            qty: "3",
            unit: "Tbsp",
            name: "miso"
          }
        ]
      },
      {
        instructions: 'And add sesame seeds and sugar and mix well.',
        ingredients: [
          {
            qty: "1",
            unit: "Tbsp",
            name: "white sugar"
          }
        ]
      },
      {
        instructions: 'Add sake, chicken stock, salt and pepper.',
        ingredients: [
          {
            qty: "1",
            unit: "Tbsp",
            name: "sake"
          },
          {
            qty: "1",
            unit: "liter",
            name: "chicken stock/broth"
          },
          {
            qty: "",
            unit: "",
            name: "salt and pepper to taste"
          }
        ]
      },
      {
        instructions: 'Keep the ramen soup simmered.',
        ingredients: []
      },
      {
        instructions: 'Bring a large pot of un-salted water to a boil (ramen noodles already have salt in the dough) While boiling, take some hot water into serving bowls to warm up the bowls. Loosen up the noodles and cook according to the package instructions. I usually cook the noodles al dente (about 15 seconds earlier than suggested time).',
        ingredients: [
          {
            qty: "2",
            unit: "servings",
            name: "ramen noodles"
          }
        ]
      },
      {
        instructions: 'When noodles are done, quickly pick them up with a mesh sieve. You don’t want to dilute your soup, so make sure you drain the water well. Serve the noodles into bowls.',
        ingredients: []
      },
      {
        instructions: 'Add the soup and top with any extra toppings you like (chashu, ramen egg, spicy bean sprout salad, corn, scallion, shiraga negi, pickled red ginger, and a sheet of nori.)',
        ingredients: []
      }
    ]
  },
  note: 'This is the plain version with no topings for quicker cooking', 
  photo_url: 'https://www.justonecookbook.com/wp-content/uploads/2014/09/Miso-Ramen-600x400.jpg',
  reference_url: 'https://www.justonecookbook.com/homemade-chashu-miso-ramen/'
)

recipe2 = Recipe.create(
  user_id: 1, 
  title: 'Perfect Whipped Cream Recipe', 
  content: {
    intro: 'Perfect whipped cream recipe is one of those essential recipes you need. This recipe gives all the steps you need to make perfect whipped cream every time.', 
    gear: [ 
      "Electric mixer"
    ], 
    warnings: '', 
    prep_time: '22 min', 
    cook_time: '2 min', 
    servings: '2 cups', 
    steps: [
      {
        instructions: 'Place mixer bowl and whisk in freezer for at least 20 minutes to chill.',
        ingredients: []
      },
      {
        instructions: 'Pour heavy whipping cream, sugar and vanilla into the cold bowl and whisk on high speed until medium to stiff peaks form, about 1 minute.',
        ingredients: [
          {
            qty: "1",
            unit: "cup",
            name: "cold heavy whipping cream"
          },
          {
            qty: "2",
            unit: "Tbsp",
            name: "white sugar"
          },
          {
            qty: "1/2",
            unit: "tsp",
            name: "vanilla"
          }
        ]
      },
      {
        instructions: 'Do not over beat.',
        ingredients: []
      }
    ]
  },
  note: '', 
  photo_url: 'https://addapinch.com/wp-content/blogs.dir/3/files/2014/05/perfect-whipped-cream-recipe-DSC_3693.jpg',
  reference_url: 'https://addapinch.com/perfect-whipped-cream-recipe/'
)



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
# spork user1.recipes[3], user2
# spork user1.recipes[5], user2
# spork user1.recipes[6], user2
# spork user1.recipes[5], user3
# spork user1.recipes[6], user3
# spork user1.recipes[7], user3


puts "DONE!"