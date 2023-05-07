module Mutations
  class DeleteJournal < Mutations::BaseMutation
    field :journal, Types::JournalType, null: false

    argument :journal_id, Integer, required: true

    def resolve(journal_id:)
      journal = Journal.find(journal_id).destroy

      {
        journal:
      }

    rescue => e
      GraphQL::ExecutionError.new(e.message)
    end
  end
end
