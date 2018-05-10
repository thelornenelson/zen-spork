class AddReferenceUrlToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :reference_url, :text
  end
end
