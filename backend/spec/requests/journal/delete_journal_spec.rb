require 'rails_helper'

RSpec.describe Mutations::DeleteJournal, type: :request do
  let(:mutation) { Mutations::DeleteJournal.new(object: nil, field: nil, context: {}) }
  let(:user) { FactoryBot.create(:user) }
  let!(:journal) { FactoryBot.create(:journal, user_id: user.id) }

  before do
    @journals = Journal.all
  end

  context '存在するjournalを削除をしようとする場合' do
    it 'journalが削除される' do
      expect do
        mutation.resolve(journal_id: journal.id)
      end.to change(@journals, :count).by(-1)
    end
  end

  context '存在しないjournalを削除をしようとする場合' do
    it 'journalが削除されない' do
      not_exist_journal_id = @journals.last.id + 1
      expect do
        mutation.resolve(journal_id: not_exist_journal_id)
      end.to_not change(@journals, :count)
    end
  end
end
