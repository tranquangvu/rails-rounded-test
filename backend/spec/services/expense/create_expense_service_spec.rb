require 'rails_helper'

RSpec.describe Expense::CreateExpenseService, type: :service do
  subject { Expense::CreateExpenseService.new(params)  }

  describe '#call' do
    let!(:account) { create(:account, balance: 1000) }

    context 'valid params' do
      let!(:params) { attributes_for(:expense, amount: 100, account_id: account.id) }

      it do
        expense = nil
        expect { expense = subject.call }.to change(Expense, :count).by(1)

        expect(expense.date).to eq (params[:date])
        expect(expense.amount).to eq (params[:amount])
        expect(expense.description).to eq (params[:description])

        expect(expense.account).to eq (account)
        expect(account.reload.balance).to eq(900)
      end
    end

    context 'invalid params' do
      let!(:params) { attributes_for(:expense, amount: 0, account_id: nil) }

      it do
        expect { subject.call }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
