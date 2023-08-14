module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String
    field :name, String
    field :nickname, String
    field :image, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
