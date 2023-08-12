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

    let(:invalid_attributes) { valid_attributes.merge(email: '') }

    def do_request
      post user_registration_path, params: 
    end

    context 'メールアドレスがある場合' do
      let(:params) { valid_attributes }

      it 'ユーザー登録ができる' do
        expect { do_request }.to change(User, :count).by(1)
        expect(User.sole).to have_attributes(name: 'test', email: 'test@example.com')
        expect(response).to have_http_status(:ok)
      end
    end

    context 'メールアドレスが空の場合' do
      let(:params) { invalid_attributes }

      it 'ユーザー登録ができない' do
        expect { do_request }.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
