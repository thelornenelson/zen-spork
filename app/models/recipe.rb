class Recipe < ApplicationRecord

  belongs_to :user
  has_one :spork
  has_many :sporks, foreign_key: "original_recipe_id"

  validates :title, presence: true
  validates :content, presence: true

  validate :content_is_acceptable
  validate :photo_url_resembles_a_url
  validate :reference_url_resembles_a_url

  def sporks_count
    self.sporks.count
  end

  def content_is_acceptable
      begin
        errors.add(:content, "steps cannot be blank") if content["steps"].blank?
        errors.add(:content, "must have at least one step") if content["steps"].length.zero?
        errors.add(:content, "must include prep_time") if content["prep_time"].blank?
        errors.add(:content, "must include cook_time") if content["cook_time"].blank?
        errors.add(:content, "must include servings") if content["servings"].blank?
      rescue
        errors.add(:content, "must exist")
      end
  end

  def photo_url_resembles_a_url
    if photo_url.present?
      # not checking for ending in .jpg, .png, etc, because many images are served from routes without valid image file extensions.
      errors.add(:photo_url, "must be valid http or https url") unless /^https?:\/\// =~ photo_url
    end
  end

  def reference_url_resembles_a_url
    if reference_url.present?
      errors.add(:reference_url, "must be valid http or https url") unless /^https?:\/\// =~ reference_url
    end
  end
end
