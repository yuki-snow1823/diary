require 'rails_helper'

RSpec.describe Mutations::UpdateJournal, type: :request do
  let(:mutation) { Mutations::UpdateJournal.new(object: nil, field: nil, context: {}) }
  let(:user) { FactoryBot.create(:user) }
  let(:journal) { FactoryBot.create(:journal, user_id: user.id) }
  let(:title) { 'test_title' }
  let(:content) { 'test_content' }

  context '存在するjournalを更新をしようとする場合' do
    context '正常系' do
      it 'journalが更新される' do
        result = mutation.resolve(journal_id: journal.id, title:, content:)
        journal = Journal.find(result[:journal].id)
        expect(journal.title).to eq(title)
        expect(journal.content).to eq(content)
        expect(journal.user_id).to eq(user.id)
      end
    end

    context '異常系' do
      it 'titleが存在しない時はjournalが更新されない' do
        expect do
          mutation.resolve(journal_id: journal.id, title: nil, content:)
        end.to raise_error(ActiveRecord::RecordInvalid) { |e|
          expect(e.record.errors.full_messages).to include("Title can't be blank")
        }
      end

      it 'contentが存在しない時はjournalが更新されない' do
        expect do
          mutation.resolve(journal_id: journal.id, title:, content: nil)
        end.to raise_error(ActiveRecord::RecordInvalid) { |e|
          expect(e.record.errors.full_messages).to include('Content is reserved')
        }
      end
    end
  end

  context '存在しないjournalを更新をしようとする場合' do
    it 'エラーが検知される' do
      not_exist_journal_id = Journal.last.id + 1
      expect do
        mutation.resolve(journal_id: not_exist_journal_id, title:, content:)
      end.to raise_error(ActiveRecord::RecordNotFound) { |e|
        expect(e.message).to include("Couldn't find Journal with 'id'=#{not_exist_journal_id}")
      }
    end
  end
end
