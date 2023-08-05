require 'rails_helper'

RSpec.describe Types::QueryType do
  describe 'journals' do
    before do
      create_list(:journal, 3)
    end

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

    it '全てのjournalを取得できる' do
      expect(result.dig('data', 'journals').size).to eq(Journal.count)
    end

    it '任意のjournalについてモデルと一致する内容を取得できる' do
      random_journal = Journal.all.sample
      expect(result.dig('data', 'journals').find { |journal| journal['id'] == random_journal.id.to_s }).to eq(
        'id' => random_journal.id.to_s,
        'title' => random_journal.title,
        'content' => random_journal.content,
        'userId' => random_journal.user_id
      )
    end
  end

  describe 'journal' do
    let(:journal) { create(:journal) }
    let(:journal_id) { journal.id }

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
      expect(result.dig('data', 'journal', 'id')).to eq(journal_id.to_s)
    end
  end

  describe 'users' do
    before do
      create_list(:user, 3)
    end

    let(:query) do
      <<~QUERY
        query GetAllUsers {
          users {
            id
            name
            nickname
            email
          }
        }
      QUERY
    end

    let(:result) do
      BackendSchema.execute(query)
    end

    it '全てのuserを取得できる' do
      expect(result.dig('data', 'users').size).to eq(User.count)
    end

    it '任意のuserについてモデルと一致する内容を取得できる' do
      random_user = User.all.sample
      expect(result.dig('data', 'users').find { |user| user['id'] == random_user.id.to_s }).to eq(
        'id' => random_user.id.to_s,
        'name' => random_user.name,
        'nickname' => random_user.nickname,
        'email' => random_user.email
      )
    end
  end
end
