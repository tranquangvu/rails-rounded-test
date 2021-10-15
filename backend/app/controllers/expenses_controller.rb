class ExpensesController < ApplicationController
  before_action :prepare_expense, only: %i[show update delete]

  def index
    expenses = Expense.order(date: :desc)
    render_resources(expenses)
  end

  def show
    render_resource(@expense)
  end

  def create
    expense = Expense.create!(expense_params)
    render_resource(expense, status: :created)
  end

  def update
    @expense.update!(expense_params)
    render_resource(@expense)
  end

  def destroy
    @expense.destroy
    head :no_content
  end

  private

  def prepare_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    params.require(:expense).permit(:amount, :date, :description, :account_id)
  end
end
