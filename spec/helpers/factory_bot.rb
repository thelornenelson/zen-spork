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
