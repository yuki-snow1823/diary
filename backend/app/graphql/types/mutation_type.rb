module Types
  class MutationType < Types::BaseObject
    field :create_journal, mutation: Mutations::CreateJournal
    field :update_journal, mutation: Mutations::UpdateJournal
    field :delete_journal, mutation: Mutations::DeleteJournal
  end
end
