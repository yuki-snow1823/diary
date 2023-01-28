require 'rails_helper'
require 'spec_helper'

describe Journal do
  it '1文字のタイトルは保存されない' do
    journal = Journal.new(title: 'h')
    expect(journal).to be_invalid

    journal.title = 'hoge'
    expect(journal).to be_valid
  end
end
