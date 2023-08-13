module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :journals, [Types::JournalType], null: false

    field :journal, Types::JournalType, null: false do
      argument :id, ID, required: true
    end

    field :user_journals, [Types::JournalType], null: false do
      argument :user_id, ID, required: true
    end

    def journals
      Journal.all
    end

    def journal(id:)
      Journal.find(id)
    end

    def user_journals(user_id:)
      Journal.where(user_id:)
    end
  end
end
