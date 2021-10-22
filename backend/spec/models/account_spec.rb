require 'rails_helper'

RSpec.describe Account, type: :model do
  context 'associations' do
    it { is_expected.to have_many(:expenses) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:bank_number) }
    it { is_expected.to validate_presence_of(:balance) }
    it { is_expected.to validate_numericality_of(:balance).is_greater_than_or_equal_to(0) }
  end

  describe '#add_balance' do
    let!(:account) { create(:account, balance: 1000) }

    it do
      account.add_balance!(10)
      expect(account.reload.balance).to eq(1010)
    end
  end

  describe '#subtract_balance' do
    let!(:account) { create(:account, balance: 1000) }

    it do
      account.subtract_balance!(10)
      expect(account.reload.balance).to eq(990)
    end
  end
end
