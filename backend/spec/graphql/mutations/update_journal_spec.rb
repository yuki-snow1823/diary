require 'rails_helper'

RSpec.describe Mutations::UpdateJournal do
  let(:user) { create(:user) }
  let(:journal) { create(:journal, user:) }

  it 'journal_id, title, contentが全て入力されたときjournalが更新できる' do
    @result = BackendSchema.execute(update_journal_mutation,
                                    variables: {
                                      journalId: journal.id,
                                      title: 'update_tile',
                                      content: 'update_content'
                                    }).as_json

    journal = Journal.find(@result.dig('data', 'updateJournal', 'journal', 'id'))
    expect(journal).to have_attributes(title: 'update_tile', content: 'update_content')
  end

  it 'titleがnilのときjournalが更新されずエラーが発生する' do
    @result = BackendSchema.execute(update_journal_mutation,
                                    variables: {
                                      journalId: journal.id,
                                      title: nil,
                                      content: 'update_content'
                                    }).as_json

    expect(@result.dig('data', 'updateJournal', 'journal')).to be_nil
    expect(@result['errors']).to be_truthy
  end

  it 'contentが空のときjournalが作成されずエラーが発生する' do
    @result = BackendSchema.execute(update_journal_mutation,
                                    variables: {
                                      journalId: journal.id,
                                      title: 'update_tile',
                                      content: nil
                                    }).as_json

    expect(@result.dig('data', 'updateJournal', 'journal')).to be_nil
    expect(@result['errors']).to be_truthy
  end

  it 'journalIdが空のときjournalが作成されずエラーが発生する' do
    @result = BackendSchema.execute(update_journal_mutation,
                                    variables: {
                                      journalId: nil,
                                      title: 'update_tile',
                                      content: 'update_content'
                                    }).as_json

    expect(@result.dig('data', 'updateJournal', 'journal')).to be_nil
    expect(@result['errors']).to be_truthy
  end

  it 'journalIdにDBに存在しない値が指定された時にjournalが作成されずエラーが発生する' do
    not_exist_journal_id = Journal.last.id + 1
    # testを通すためにこの書き方にしているが、そもそもの実装の方を変えた方が良いかもしれない
    expect do
      BackendSchema.execute(update_journal_mutation,
                            variables: {
                              journalId: not_exist_journal_id,
                              title: 'update_tile',
                              content: 'update_content'
                            })
    end.to raise_error(ActiveRecord::RecordNotFound)
  end

  def update_journal_mutation
    <<~GRAPHQL
      mutation updateJournal($journalId: Int!, $title: String!, $content: String!) {
        updateJournal(input: {
          journalId: $journalId,
          title: $title,
          content: $content,
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
