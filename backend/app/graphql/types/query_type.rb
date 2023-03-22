module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :journals, resolver: Resolvers::JournalsResolver

    # field :journals, [Types::JournalType], null: false

    # def journals
    #   Journal.all
    # end

  end
end
