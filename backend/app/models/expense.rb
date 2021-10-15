class Expense < ApplicationRecord
  # accociations
  belongs_to :account

  # validations
  validates :amount, :date, :description, presence: true
  validates :amount, numericality: { greater_than: 0, only_integer: true }
end
