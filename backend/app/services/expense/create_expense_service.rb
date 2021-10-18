class Expense::CreateExpenseService < ApplicationService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def call
    ActiveRecord::Base.transaction do
      expense = Expense.create!(params)
      expense.account.subtract_balance!(expense.amount)
      expense
    end
  end
end
