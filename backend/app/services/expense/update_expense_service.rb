class Expense::UpdateExpenseService < ApplicationService
  attr_reader :expense, :params

  def initialize(expense, params)
    @expense = expense
    @params = params
  end

  def call
    ActiveRecord::Base.transaction do
      # reset previous account balance
      @expense.account.add_balance!(@expense.amount)

      # update expense and current account balance
      @expense.update!(params)
      @expense.account.subtract_balance!(@expense.amount)
      @expense
    end
  end
end
