class ExpensesController < ApplicationController
  before_action :prepare_expense, only: %i[show update destroy]

  def index
    expenses = Expense.order(date: :desc)
    render_resources(expenses)
  end

  def show
    render_resource(@expense)
  end

  def create
    expense = Expense::CreateExpenseService.call(expense_params)
    render_resource(expense, status: :created)
  end

  def update
    @expense = Expense::UpdateExpenseService.call(@expense, expense_params)
    render_resource(@expense)
  end

  def destroy
    Expense::DestroyExpenseService.call(@expense)
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
