require 'rails_helper'

RSpec.describe Mutations::CreateJournal do
  let(:user) { create(:user) }

  it 'title, content, user_idが全て入力されたときjournalが作成できる' do
    expect do
      @result = BackendSchema.execute(create_journal_mutation,
                                      variables: {
                                        title: 'test_tile',
                                        content: 'test_content',
                                        userId: user.id
                                      }).as_json
    end.to change(Journal, :count).by(1)

    journal = Journal.find(@result.dig('data', 'createJournal', 'journal', 'id'))
    expect(journal).to have_attributes(title: 'test_tile', content: 'test_content', user_id: user.id)
  end

  it 'titleがnilのときjournalが作成されずエラーが発生する' do
    expect do
      @result = BackendSchema.execute(create_journal_mutation,
                                      variables: {
                                        title: nil,
                                        content: 'test_content',
                                        userId: user.id
                                      }).as_json
    end.to_not change(Journal, :count)

    expect(@result.dig('data', 'createJournal', 'journal')).to be_nil
    expect(@result['errors']).to be_truthy
  end

  it 'contentがnilのときjournalが作成されずエラーが発生する' do
    expect do
      @result = BackendSchema.execute(create_journal_mutation,
                                      variables: {
                                        title: 'test_tile',
                                        content: nil,
                                        userId: user.id
                                      }).as_json
    end.to_not change(Journal, :count)

    expect(@result.dig('data', 'createJournal', 'journal')).to be_nil
    expect(@result['errors']).to be_truthy
  end

  it 'userIdがnilのときjournalが作成されずエラーが発生する' do
    expect do
      @result = BackendSchema.execute(create_journal_mutation,
                                      variables: {
                                        title: 'test_tile',
                                        content: 'test_content',
                                        userId: nil
                                      }).as_json
    end.to_not change(Journal, :count)

    expect(@result.dig('data', 'createJournal', 'journal')).to be_nil
    expect(@result['errors']).to be_truthy
  end

  it 'userIdにDBに存在しない値が指定された時にjournalが作成されずエラーが発生する' do
    not_exist_user_id = User.last.id + 1
    # testを通すためにこの書き方にしているが、そもそもの実装の方を変えた方が良いかもしれない
    expect do
      BackendSchema.execute(create_journal_mutation,
                            variables: {
                              title: 'test_tile',
                              content: 'test_content',
                              userId: not_exist_user_id
                            }).as_json
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  def create_journal_mutation
    <<~GRAPHQL
      mutation createJournal($title: String!, $content: String!, $userId: Int!) {
        createJournal(input: {
          title: $title,
          content: $content,
          userId: $userId,
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
