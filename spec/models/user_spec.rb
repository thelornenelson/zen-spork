require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { create(:user) }

  it 'should be a valid with valid attributes' do
    expect(user).to be_valid
  end

  it 'should not be valid if first_name is missing' do
    user.first_name = nil
    expect(user).to_not be_valid
  end

  it 'should not be valid if last_name is missing' do
    user.last_name = nil
    expect(user).to_not be_valid
  end

  it 'should not be valid if password is missing' do
    user.password = nil
    expect(user).to_not be_valid
  end

  it 'should not be valid if password is missing' do
    user.password = nil
    expect(user).to_not be_valid
  end

  it 'should not be valid if password is too short' do
    user.password = 'ab'
    expect(user).to_not be_valid
  end

  it 'should not be valid if email is missing' do
    user.email = nil
    expect(user).to_not be_valid
  end

  it 'should not be valid if email is already registered' do
    # need to reference user here or else it never gets created and user2 is valid
    user
    user2 = User.new(first_name: 'a', last_name: 'b', password: 'testing', email: 'test@test.test')
    expect(user2).to_not be_valid
  end
end
