module Resolvers
  class JournalsResolver < GraphQL::Schema::Resolver
    type [Types::JournalType], null: false

    argument :ids, [ID], required: false

    def resolve(ids: nil)
      journals = Journal.all
      journals = journals.where(id: ids) if ids.present?
      journals
    end
  end
end