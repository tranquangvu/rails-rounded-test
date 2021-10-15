class ExpenseSerializer < BaseSerializer
  attributes :amount, :date, :description, :account_id
end
