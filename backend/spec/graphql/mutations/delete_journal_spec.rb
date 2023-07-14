require 'rails_helper'

RSpec.describe Mutations::DeleteJournal, type: :request do
  let(:mutation) { Mutations::DeleteJournal.new(object: nil, field: nil, context: {}) }
  let(:user) { create(:user) }
  let!(:journal) { create(:journal, user_id: user.id) }

  it '存在するjournalIdが入力されたときjournalが削除できる' do
    expect do
      mutation.resolve(journal_id: journal.id)
    end.to change(Journal, :count).by(-1)
  end

  it '存在しないjournalIdが入力されたときjournalが削除されない' do
    not_exist_journal_id = Journal.last.id + 1
    expect do
      mutation.resolve(journal_id: not_exist_journal_id)
    end.to_not change(Journal, :count)
  end

  it 'journalIdがnilのときjournalが削除されない' do
    expect do
      mutation.resolve(journal_id: nil)
    end.to_not change(Journal, :count)
  end
end
