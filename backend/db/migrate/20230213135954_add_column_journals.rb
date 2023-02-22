class AddColumnJournals < ActiveRecord::Migration[7.0]
  def up
    add_column :journals, :user_id, :integer, :null => false
  end
end
