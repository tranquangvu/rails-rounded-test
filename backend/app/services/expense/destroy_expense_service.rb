class Expense::DestroyExpenseService < ApplicationService
  attr_reader :expense

  def initialize(expense)
    @expense = expense
  end

  def call
    ActiveRecord::Base.transaction do
      @expense.destroy!
      @expense.account.add_balance!(@expense.amount)
      @expense
    end
  end
end
