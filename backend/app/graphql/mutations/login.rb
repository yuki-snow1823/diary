module Mutations
  class Login < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(email:, password:)
      user = User.find_by(email: email)

      if user&.valid_password?(password)
        # devise_token_authのauthenticate_user!メソッドでトークンを発行
        token = user.create_new_auth_token
        p "あああ"
        p token
        p context[:session]
        p user
        p "あああ"
        context[:session][:token] = token["access-token"]



        {
          user: user,
          errors: []
        }
      else
        {
          user: nil,
          errors: ["メールアドレスまたはパスワードが間違っています。"]
        }
      end
    end
  end
end
