class AddLockVersionToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :lock_version, :integer
  end
end
