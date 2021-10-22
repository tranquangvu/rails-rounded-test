require 'rails_helper'

RSpec.describe Account::CreateAccountService, type: :service do
  subject { Account::CreateAccountService.new(params)  }

  describe '#call' do
    context 'valid params' do
      let(:params) { attributes_for(:account, balance: nil) }

      it do
        account = nil
        expect { account = subject.call }.to change(Account, :count).by(1)
        expect(account.balance).to eq(Account::CreateAccountService::INITIAL_BALANCE)
      end
    end

    context 'invalid params' do
      let(:params) { attributes_for(:account, name: nil, balance: nil) }

      it do
        expect { subject.call }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
