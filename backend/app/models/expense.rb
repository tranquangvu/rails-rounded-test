# == Schema Information
#
# Table name: expenses
#
#  id           :integer          not null, primary key
#  amount       :integer
#  date         :date
#  description  :text
#  lock_version :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :integer
#
# Indexes
#
#  index_expenses_on_account_id  (account_id)
#
# Foreign Keys
#
#  account_id  (account_id => accounts.id)
#
class Expense < ApplicationRecord
  # accociations
  belongs_to :account

  # validations
  validates :date, presence: true
  validates :description, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0, only_integer: true }
  validate :check_account_balance

  private

  def check_account_balance
    errors.add(:base, 'Account do not have enough balance') if account && amount && account.balance < amount
  end
end
