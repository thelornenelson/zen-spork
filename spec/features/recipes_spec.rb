require 'rails_helper'

RSpec.feature "Visitor navigates to home page", type: :feature, js: true do

  scenario "They see all products" do
    # ACT
    visit root_path

    # puts page.html

    expect(page).to have_content('SPORK')
    # DEBUG / VERIFY
    # save_screenshot 'recipe_homepage.png'
  end

end