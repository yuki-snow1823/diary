module Mutations
  class CreateJournal < Mutations::BaseMutation
    field :journal, Types::JournalType, null: false

    argument :title, String, required: true
    argument :content, String, required: true
    argument :user_id, Integer, required: true

    def resolve(user_id:, title:, content:)
      journal = Journal.create!({
                                  user_id:,
                                  title:,
                                  content:
                                })

      {
        journal:
      }
    end
  end
end
