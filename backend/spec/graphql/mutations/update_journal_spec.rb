require 'rails_helper'

RSpec.describe Mutations::UpdateJournal, type: :request do
  let(:mutation) { Mutations::UpdateJournal.new(object: nil, field: nil, context: {}) }
  let(:user) { create(:user) }
  let(:journal) { create(:journal, user_id: user.id) }

  it 'journal_id, title, contentが全て入力されたときjournalが更新できる' do
    result = mutation.resolve(journal_id: journal.id, title: 'udpate_title', content: 'update_content')
    journal = Journal.find(result[:journal].id)
    expect(journal).to have_attributes(title: 'udpate_title', content: 'update_content', user_id: user.id)
  end

  it 'titleがnilのときjournalが更新されずエラーが発生する' do
    expect do
      mutation.resolve(journal_id: journal.id, title: nil, content: 'update_content')
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'contentがnilのときjournalが更新されずエラーが発生する' do
    expect do
      mutation.resolve(journal_id: journal.id, title: 'udpate_title', content: nil)
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'journal_idがnilのときjournalが更新されずエラーが発生する' do
    expect do
      mutation.resolve(journal_id: nil, title: 'udpate_title', content: 'update_content')
    end.to raise_error(ActiveRecord::RecordNotFound)
  end

  it 'journalIdにDBに存在しない値が指定された時にjournalが作成されずエラーが発生する' do
    not_exist_journal_id = Journal.last.id + 1
    expect do
      mutation.resolve(journal_id: not_exist_journal_id, title: 'udpate_title', content: 'update_content')
    end.to raise_error(ActiveRecord::RecordNotFound)
  end
end
