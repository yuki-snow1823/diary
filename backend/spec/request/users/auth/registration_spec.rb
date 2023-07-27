require 'rails_helper'

RSpec.describe 'Users::Auth::Registrations', type: :request do
  describe 'POST /users/auth/sign_up' do
    let(:valid_attributes) do
      {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password'
      }
    end

    context '登録に必要な情報がある場合' do
      it 'ユーザー登録ができる' do
        post user_registration_path, params: valid_attributes
        expect(User.count).to eq 1
        expect(User.first.name).to eq 'test'
        expect(response).to have_http_status(:ok)
      end
    end

    context '登録に必要な情報がない場合' do
      let(:invalid_attributes) { valid_attributes.merge(email: '') }

      it 'ユーザー登録ができない' do
        post user_registration_path, params: invalid_attributes
        expect(User.count).to eq 0
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
