require 'rails_helper'
require 'spec_helper'

describe Journal do
  describe 'バリデーションのテスト' do
    it '1文字のタイトルは保存されない' do
      expect(build(:journal, title: 't')).to be_invalid
    end
  end
end
