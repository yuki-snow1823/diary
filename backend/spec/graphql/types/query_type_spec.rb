require 'rails_helper'

RSpec.describe Types::QueryType do
  describe 'journals' do
    let!(:journal1) { create(:journal, title: 'タイトル1', content: '内容1') }
    let!(:journal2) { create(:journal, title: 'タイトル2', content: '内容2') }
    let!(:journal3) { create(:journal, title: 'タイトル3', content: '内容3') }

    let(:query) do
      <<~QUERY
        query GetAllJournals {
          journals {
            id
            title
            content
            userId
          }
        }
      QUERY
    end

    let(:result) do
      BackendSchema.execute(query)
    end

    it '全てのjournalを取得できること' do
      expect(result.fetch('data')).to eq(
        {
          'journals' => [
            {
              'id' => journal1.id.to_s,
              'title' => 'タイトル1',
              'content' => '内容1',
              'userId' => journal1.user_id
            },
            {
              'id' => journal2.id.to_s,
              'title' => 'タイトル2',
              'content' => '内容2',
              'userId' => journal2.user_id
            },
            {
              'id' => journal3.id.to_s,
              'title' => 'タイトル3',
              'content' => '内容3',
              'userId' => journal3.user_id
            }
          ]
        }
      )
    end
  end

  describe 'journal' do
    let!(:journal) { create(:journal, title: 'タイトル', content: '内容') }
    let!(:journal_id) { journal.id }

    let(:query) do
      <<~QUERY
        query GetJornal($id: ID!) {
          journal(id: $id) {
            id
            title
            content
            userId
          }
        }
      QUERY
    end

    let(:result) do
      BackendSchema.execute(
        query,
        variables: {
          id: journal_id
        }
      )
    end

    it 'idで指定したjournalを取得できる' do
      expect(result.fetch('data')).to eq(
        'journal' => {
          'id' => journal_id.to_s,
          'title' => 'タイトル',
          'content' => '内容',
          'userId' => journal.user_id
        }
      )
    end
  end

  describe 'user_journals' do
    let(:user) { create(:user) }
    let(:user_id) { user.id }
    let!(:journals) { create_list(:journal, 3, user:) }

    let(:query) do
      <<~QUERY
        query GetUserJournals($userId: ID!) {
          userJournals(userId: $userId) {
            id
            title
            content
            userId
          }
        }
      QUERY
    end

    let(:result) do
      BackendSchema.execute(
        query,
        variables: {
          userId: user_id
        }
      )
    end

    it 'userIdで指定したuserのjournalを取得できる' do
      expect(result.dig('data', 'userJournals').size).to eq(journals.size)
    end

    it '任意のjournalについてモデルと一致する内容を取得できる' do
      random_journal = journals.sample
      expect(result.dig('data', 'userJournals').find { |journal| journal['id'] == random_journal.id.to_s }).to eq(
        'id' => random_journal.id.to_s,
        'title' => random_journal.title,
        'content' => random_journal.content,
        'userId' => random_journal.user_id
      )
    end
  end
end
