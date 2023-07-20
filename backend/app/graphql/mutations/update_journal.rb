module Mutations
  class UpdateJournal < Mutations::BaseMutation
    field :journal, Types::JournalType, null: false
    description '特定のJournalの更新'

    argument :journal_id, Integer, required: true
    argument :title, String, required: true
    argument :content, String, required: true

    def resolve(journal_id:, title:, content:)
      journal = Journal.find(journal_id)
      journal.update!({
                        title:,
                        content:
                      })

      {
        journal:
      }
    end
  end
end
