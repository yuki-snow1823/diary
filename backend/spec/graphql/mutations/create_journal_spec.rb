require 'rails_helper'

RSpec.describe Mutations::CreateJournal do
  let(:user) { create(:user) }

  let(:mutation) { <<~MUTATION }
    mutation ($title: String!, $content: String!, $userId: Int!) {
      createJournal(input: { title: $title, content: $content, userId: $userId }) {
        journal {
          id
          title
          content
          userId
        }
      }
    }
  MUTATION

  let(:title) { 'test_title' }
  let(:content) { 'test_content' }
  let(:user_id) { user.id } 

  let(:result) do
    BackendSchema.execute(
      mutation,
      variables: {
        title: title,
        content: content,
        userId: user_id
      }
    )
  end

  # TODO: 本当はcontextログイン時などを設定したい
  it 'title, content, user_idが全て入力されたときjournalが作成できる' do
    expect { result }.to change { Journal.count }.by(1)
    expect(result.dig('data', 'createJournal', 'journal', 'userId')).to eq(user_id)
    expect(result.dig('data', 'createJournal', 'journal', 'title')).to eq(title)
    expect(result.dig('data', 'createJournal', 'journal', 'content')).to eq(content)
  end
end
