class AddLockVersionToExpenses < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :lock_version, :integer
  end
end
