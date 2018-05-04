class FixPhotoColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :recipes, :proto_url, :photo_url
  end
end
