require 'rails_helper'

RSpec.describe Expense::UpdateExpenseService, type: :service do
  subject { Expense::UpdateExpenseService.new(expense, params)  }

  describe '#call' do
    let!(:account) { create(:account, balance: 1000) }
    let!(:expense) { Expense::CreateExpenseService.call(attributes_for(:expense, amount: 100, account_id: account.id)) }

    context 'valid params' do
      let!(:params) { { amount: 200 } }

      it do
        expense = subject.call
        expect(expense.amount).to eq (params[:amount])
        expect(account.reload.balance).to eq(800)
      end
    end

    context 'invalid params' do
      let!(:params) { { amount: 0 } }

      it do
        expect { subject.call }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
