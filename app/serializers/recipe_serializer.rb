class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :note, :photo_url, :reference_url, :content, :created_at, :updated_at, :sporks_count

  private
    def sporks_count
      self.sporks.count
    end
end
