class SporkSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :recipe_id, :original_recipe_id, :recipe_diffs, :similarity

end
