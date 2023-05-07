module Types
  class MutationType < Types::BaseObject
    field :create_journal, mutation: Mutations::CreateJournal
    field :delete_journal, mutation: Mutations::DeleteJournal
  end
end
