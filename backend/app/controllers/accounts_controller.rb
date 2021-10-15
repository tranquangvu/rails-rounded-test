class AccountsController < ApplicationController
  before_action :prepare_account, only: %i[show update destroy]

  def index
    accounts = Account.order(created_at: :desc)
    render_resources(accounts)
  end

  def show
    render_resource(@account)
  end

  def create
    account = Account.create!(account_params)
    render_resource(account, status: :created)
  end

  def update
    @account.update!(account_params)
    render_resource(@account)
  end

  def destroy
    @account.destroy
    head :no_content
  end

  private

  def prepare_account
    @account = Account.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:name, :bank_number)
  end
end
