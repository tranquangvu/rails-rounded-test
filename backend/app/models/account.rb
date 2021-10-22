# == Schema Information
#
# Table name: accounts
#
#  id           :integer          not null, primary key
#  balance      :decimal(8, 2)
#  bank_number  :string
#  lock_version :integer
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Account < ApplicationRecord
  # associations
  has_many :expenses, dependent: :destroy

  # validations
  validates :name, presence: true
  validates :bank_number, presence: true
  validates :balance, presence: true, numericality: { greater_than_or_equal_to: 0 }

  def add_balance!(amount)
    self.balance += amount
    save!
  end

  def subtract_balance!(amount)
    self.balance -= amount
    save!
  end
end
