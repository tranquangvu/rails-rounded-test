class Account::CreateAccountService < ApplicationService
  attr_reader :params

  INITIAL_BALANCE = 1000.freeze

  def initialize(params)
    @params = params
  end

  def call
    account = Account.new(params)
    account.balance = INITIAL_BALANCE
    account.save!
  end
end
