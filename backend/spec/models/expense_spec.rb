require 'rails_helper'

RSpec.describe Expense, type: :model do
  context 'associations' do
    it { is_expected.to belong_to(:account) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:date) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:amount) }
    it { is_expected.to validate_numericality_of(:amount).is_greater_than(0).only_integer() }

    describe '#check_account_balance' do
      let(:account) { build(:account) }

      context 'valid' do
        let(:expense) { build(:expense, account: account, amount: account.balance + 1) }

        it do
          expense.valid?
          expect(expense.errors[:base]).to include('Account do not have enough balance')
        end
      end

      context 'invalid' do
        let(:expense) { build(:expense, account: account, amount: account.balance - 1) }

        it do
          expense.valid?
          expect(expense.errors[:base]).to_not include('Account do not have enough balance')
        end
      end
    end
  end
end
