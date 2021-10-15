class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :bank_number
      t.decimal :balance, precision: 8, scale: 2
      t.timestamps
    end
  end
end
