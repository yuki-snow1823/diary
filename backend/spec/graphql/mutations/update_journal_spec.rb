require 'rails_helper'

RSpec.describe Mutations::UpdateJournal do
  let(:user) { create(:user) }
  let(:journal) { create(:journal, user:) }

  let(:mutation) { <<~MUTATION }
    mutation ($journalId: Int!, $title: String!, $content: String!) {
      updateJournal(input: { journalId: $journalId, title: $title, content: $content }) {
        journal {
          id
          title
          content
          userId
        }
      }
    }
  MUTATION

  let(:title) { 'updated_title' }
  let(:content) { 'updated_content' }

  let(:result) do
    BackendSchema.execute(
      mutation,
      variables: {
        journalId: journal_id,
        title:,
        content:
      }
    )
  end

  # TODO: 本当はcontextログイン時なども設定したい
  context '全ての引数に有効な値が設定された場合' do
    let(:journal_id) { journal.id }
    it 'journalが更新できる' do
      journal = Journal.find(journal_id)
      expect { result }.to change {
        [journal.reload.title, journal.reload.content]
      }.from([journal.title, journal.content]).to([title, content])
    end
  end

  context 'journalIdにDBに存在しない値が指定された場合' do
    let(:journal_id) { Journal.maximum(:id) + 1 }
    it 'journalが更新されずエラーが発生する' do
      expect(result['errors'].first['message']).to be_present
    end
  end
end
