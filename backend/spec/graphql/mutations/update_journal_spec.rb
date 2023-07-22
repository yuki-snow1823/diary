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

  let(:journal_id) { journal.id }
  let(:title) { 'updated_title' }
  let(:content) { 'updated_content' }

  # 引数を渡すためにlambdaを使うのが正しいのかどうかは議論の余地があると思う
  let(:result) do
    lambda { |journal_id|
      BackendSchema.execute(
        mutation,
        variables: {
          journalId: journal_id,
          title:,
          content:
        }
      )
    }
  end

  # TODO: 本当はcontextログイン時などを設定したい
  # lambdaを使っているので毎回callする必要がある
  it 'journal_id, title, contentが全て入力されたときjournalが更新できる' do
    expect(result.call(journal_id).dig('data', 'updateJournal', 'journal', 'id')).to eq(journal_id.to_s)
    expect(result.call(journal_id).dig('data', 'updateJournal', 'journal', 'title')).to eq(title)
    expect(result.call(journal_id).dig('data', 'updateJournal', 'journal', 'content')).to eq(content)
  end

  # lambdaを使っているので毎回callする必要がある
  it 'journalIdにDBに存在しない値が指定された時にjournalが更新されずエラーが発生する' do
    not_exist_journal_id = Journal.last.id + 1
    expect(result.call(not_exist_journal_id)['errors'].first['message']).to be_present
  end
end
