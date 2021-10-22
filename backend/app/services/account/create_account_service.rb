class Account::CreateAccountService < ApplicationService
  attr_reader :params

  INITIAL_BALANCE = 1000.freeze

  def initialize(params)
    @params = params
  end

  def call
    Account.create!(params.merge(balance: INITIAL_BALANCE))
  end
end
