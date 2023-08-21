module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :journals, [Types::JournalType], null: false

    field :journal, Types::JournalType, null: false do
      argument :id, ID, required: true
    end

    def journals
      Journal.order(:id)
    end

    def journal(id:)
      Journal.find(id)
    end
  end
end
