require 'rails_helper'

RSpec.describe Mutations::CreateJournal, type: :request do
  let(:mutation) { Mutations::CreateJournal.new(object: nil, field: nil, context: {}) }
  let(:user) { FactoryBot.create(:user) }
  let(:title) { 'test_title' }
  let(:content) { 'test_content' }

  context 'ユーザーに紐付く' do
    context '紐付いているユーザーが正しい' do
      it 'journalが作成される' do
        result = mutation.resolve(title:, content:, user_id: user.id)
        journal = Journal.find(result[:journal].id)
        expect(journal.title).to eq(title)
        expect(journal.content).to eq(content)
        expect(journal.user_id).to eq(user.id)
      end

      it 'titleが存在しない時はjournalが作成されない' do
        expect do
          mutation.resolve(title: nil, content:, user_id: user.id)
        end.to raise_error(ActiveRecord::RecordInvalid) { |e|
          expect(e.record.errors.full_messages).to include("Title can't be blank")
        }
      end

      it 'contentが存在しない時はjournalが作成されない' do
        expect do
          mutation.resolve(title:, content: nil, user_id: user.id)
        end.to raise_error(ActiveRecord::RecordInvalid) { |e|
          expect(e.record.errors.full_messages).to include('Content is reserved')
        }
      end
    end

    context '紐付けようとしているユーザーが存在しない' do
      it 'journalが作成されない' do
        not_exist_user_id = User.last.id + 1
        expect do
          mutation.resolve(title:, content:, user_id: not_exist_user_id)
        end.to raise_error(ActiveRecord::RecordInvalid) { |e|
          expect(e.record.errors.full_messages).to include('User must exist')
        }
      end
    end
  end

  context 'ユーザーに紐付かない' do
    it 'journalが作成されない' do
      expect do
        mutation.resolve(title:, content:, user_id: nil)
      end.to raise_error(ActiveRecord::RecordInvalid) { |e|
        expect(e.record.errors.full_messages).to include('User must exist')
      }
    end
  end
end
