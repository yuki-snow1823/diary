require 'rails_helper'
require 'spec_helper'

describe Journal do
  describe 'バリデーションのテスト' do
    it '2文字のタイトルは保存される' do
      expect(build(:journal, title: 'tt')).to be_valid
    end

    it '1文字のタイトルは保存されない' do
      expect(build(:journal, title: 't')).to be_invalid
    end

    it '空文字のタイトルは保存されない' do
      expect(build(:journal, title: '')).to be_invalid
    end

    it 'タイトルがnilの場合は保存されない' do
      expect(build(:journal, title: nil)).to be_invalid
    end

    it '1文字の内容は保存される' do
      expect(build(:journal, content: 'c')).to be_valid
    end

    it '空文字の内容は保存される' do
      expect(build(:journal, content: '')).to be_valid
    end

    it '内容がnilの場合は保存されない' do
      expect(build(:journal, content: nil)).to be_invalid
    end
  end
end
