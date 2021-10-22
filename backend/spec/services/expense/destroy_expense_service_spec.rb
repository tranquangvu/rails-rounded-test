require 'rails_helper'

RSpec.describe Expense::DestroyExpenseService, type: :service do
  subject { Expense::DestroyExpenseService.new(expense)  }

  describe '#call' do
    let!(:account) { create(:account, balance: 1000) }
    let!(:expense) { Expense::CreateExpenseService.call(attributes_for(:expense, amount: 100, account_id: account.id)) }

    it do
      expect { subject.call }.to change(Expense, :count).by(-1)
      expect(account.reload.balance).to eq(1000)
    end
  end
end
