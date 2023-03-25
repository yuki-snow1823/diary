class ChangeColumnsNullFalseOnJournalsbundle < ActiveRecord::Migration[7.0]
  def up
    change_table :journals, bulk: true do |t|
      t.change :title, :text, null: false
      t.change :content, :text, null: false
    end
  end

  def down
    change_table :journals, bulk: true do |t|
      t.change :title, :text, null: true
      t.change :content, :text, null: true
    end
  end
end
