class AccountsController < ApplicationController
  before_action :prepare_account, only: %i[show update destroy]

  def index
    accounts = Account.order(created_at: :desc)
    render_resources(accounts)
  end

  def show
    render_resource(@account, include_expenses: true)
  end

  def create
    account = Account::CreateAccountService.call(account_params)
    render_resource(account, include_expenses: true, status: :created)
  end

  def update
    @account.update!(account_params)
    render_resource(@account, include_expenses: true)
  end

  def destroy
    @account.destroy!
    head :no_content
  end

  private

  def prepare_account
    @account = Account.includes(:expenses).find(params[:id])
  end

  def account_params
    params.require(:account).permit(:name, :bank_number)
  end
end
