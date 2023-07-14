require 'rails_helper'

RSpec.describe Mutations::CreateJournal, type: :request do
  let(:mutation) { Mutations::CreateJournal.new(object: nil, field: nil, context: {}) }
  let(:user) { create(:user) }

  it 'title, content, user_idが全て入力されたときjournalが作成できる' do
    expect do
      @result = mutation.resolve(title: 'test_title', content: 'test_content', user_id: user.id)
    end.to change(Journal, :count).by(1)

    journal = Journal.find(@result[:journal].id)
    expect(journal).to have_attributes(title: 'test_title', content: 'test_content', user_id: user.id)
  end

  it 'titleがnilのときjournalが作成されずエラーが発生する' do
    expect do
      mutation.resolve(title: nil, content: 'test_content', user_id: user.id)
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'contentがnilのときjournalが作成されずエラーが発生する' do
    expect do
      mutation.resolve(title: 'test_title', content: nil, user_id: user.id)
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'userIdがnilのときjournalが作成されずエラーが発生する' do
    expect do
      mutation.resolve(title: 'test_title', content: 'test_content', user_id: nil)
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'userIdにDBに存在しない値が指定された時にjournalが作成されずエラーが発生する' do
    not_exist_user_id = User.last.id + 1
    expect do
      mutation.resolve(title: 'test_title', content: 'test_content', user_id: not_exist_user_id)
    end.to raise_error(ActiveRecord::RecordInvalid)
  end
end
