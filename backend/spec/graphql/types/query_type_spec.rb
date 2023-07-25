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
end
