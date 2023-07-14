require 'rails_helper'

RSpec.describe Mutations::DeleteJournal do
  let(:user) { create(:user) }
  let!(:journal) { create(:journal, user:) }

  it '存在するjournalIdが入力されたときjournalが削除できる' do
    expect do
      BackendSchema.execute(delete_journal_mutation,
                            variables: {
                              journalId: journal.id
                            })
    end.to change(Journal, :count).by(-1)
  end

  it '存在しないjournalIdが入力されたときjournalが削除されない' do
    not_exist_journal_id = Journal.last.id + 1
    expect do
      BackendSchema.execute(delete_journal_mutation,
                            variables: {
                              journalId: not_exist_journal_id
                            })
    end.to_not change(Journal, :count)
  end

  it 'journalIdがnilのときjournalが削除されない' do
    expect do
      BackendSchema.execute(delete_journal_mutation,
                            variables: {
                              journalId: nil
                            })
    end.to_not change(Journal, :count)
  end

  def delete_journal_mutation
    <<~GRAPHQL
      mutation deleteJournal($journalId: Int!) {
        deleteJournal(input: {
          journalId: $journalId,
        }) {
          journal {
            id
            title
            content
            userId
          }
        }
      }
    GRAPHQL
  end
end
