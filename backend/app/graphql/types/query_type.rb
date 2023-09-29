module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    field :users, [Types::UserType], null: false 

    field :journals, [Types::JournalType], null: false

    field :journal, Types::JournalType, null: false do
      argument :id, ID, required: true
    end

    field :user_journals, [Types::JournalType], null: false do
      argument :user_id, ID, required: true
    end

    def user(id:)
      User.find(id)
    end

    def journals
      Journal.order(:id)
    end

    def journal(id:)
      Journal.find(id)
    end

    def users
      User.all
    end

    def user_journals(user_id:)
      Journal.where(user_id:)
    end
  end
end
