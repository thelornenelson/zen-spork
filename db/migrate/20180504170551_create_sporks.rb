class CreateSporks < ActiveRecord::Migration[5.2]
  def change
    create_table :sporks do |t|
      t.references :user, foreign_key: true
      t.references :recipe, foreign_key: true
      t.references :original_recipe, index: true, foreign_key: {to_table: :recipes}

      t.timestamps
    end
  end
end
