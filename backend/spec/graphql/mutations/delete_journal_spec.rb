require 'rails_helper'

RSpec.describe Mutations::DeleteJournal do
  let(:user) { create(:user) }
  let!(:journal) { create(:journal, user:) }

  let(:mutation) { <<~MUTATION }
    mutation ($journalId: Int!) {
      deleteJournal(input: { journalId: $journalId }) {
        journal {
          id
          title
          content
          userId
        }
      }
    }
  MUTATION

  let(:journal_id) { journal.id }

  let(:result) do
    BackendSchema.execute(
      mutation,
      variables: {
        journalId: journal_id
      }
    )
  end

  # TODO: 本当はcontextログイン時などを設定したい
  it '存在するjournalIdが入力されたときjournalが削除できる' do
    expect { result }.to change { Journal.count }.by(-1)
  end
end
