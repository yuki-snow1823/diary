module Types
  class MutationType < Types::BaseObject
    field :create_journal, mutation: Mutations::CreateJournal
  end
end
