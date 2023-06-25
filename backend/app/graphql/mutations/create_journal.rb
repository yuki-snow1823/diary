module Mutations
  class CreateJournal < Mutations::BaseMutation
    field :journal, Types::JournalType, null: false

    argument :title, String, required: true
    argument :content, String, required: true
    argument :user_id, Integer, required: true

    def resolve(title:, content:, user_id:)
      journal = Journal.create!({
                                  title:,
                                  content:,
                                  user_id:
                                })

      {
        journal:
      }
    end
  end
end
