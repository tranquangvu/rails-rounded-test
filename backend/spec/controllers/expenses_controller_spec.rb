require 'rails_helper'

RSpec.describe ExpensesController, type: :controller do
  describe 'GET #index' do
    let!(:expenses) { create_list(:expense, 3) }

    it do
      get :index

      expect(response).to have_http_status(:ok)
      expect(json_response.count).to eq(expenses.count)
    end
  end

  describe 'GET #show' do
    let(:expense) { create(:expense) }

    it do
      get :show, params: { id: expense.id }

      expect(response).to have_http_status(:ok)
      expect(json_response['id']).to eq(expense.id)
    end
  end

  describe 'POST #create' do
    def do_request
      post :create, params: { expense: expense_params }
    end

    let!(:account) { create(:account, balance: 1000) }

    context 'valid' do
      let(:expense_params) { attributes_for(:expense, amount: 100, account_id: account.id) }

      it do
        expect { do_request }.to change(Expense, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(json_response['amount']).to eq(expense_params[:amount])
        expect(account.reload.balance).to eq(900)
      end
    end

    context 'invalid' do
      let(:expense_params) { attributes_for(:expense, amount: 0, account_id: account.id) }

      it do
        expect { do_request }.not_to change(Expense, :count)
        expect(response).to have_http_status(:bad_request)
        expect(json_response['amount']).to include('Amount must be greater than 0')
      end
    end
  end

  describe 'PUT #update' do
    let!(:account) { create(:account, balance: 1000) }
    let!(:expense) { Expense::CreateExpenseService.call(attributes_for(:expense, amount: 100, account_id: account.id)) }

    def do_request
      post :update, params: { id: expense.id, expense: expense_params }
    end

    context 'valid' do
      let(:expense_params) { { amount: 200 } }

      it do
        do_request
        expect(response).to have_http_status(:ok)
        expect(expense.reload.amount).to eq(200)
        expect(account.reload.balance).to eq(800)
      end
    end

    context 'invalid' do
      let(:expense_params) { { amount: 0 } }

      it do
        do_request
        expect(response).to have_http_status(:bad_request)
        expect(json_response['amount']).to include('Amount must be greater than 0')
        expect(expense.reload.amount).to eq(100)
        expect(account.reload.balance).to eq(900)
      end
    end
  end

  describe 'DELETE #destroy' do
    def do_request
      delete :destroy, params: { id: expense.id }
    end

    let!(:account) { create(:account, balance: 1000) }
    let!(:expense) { Expense::CreateExpenseService.call(attributes_for(:expense, amount: 100, account_id: account.id)) }

    it do
      expect { do_request }.to change(Expense, :count).by(-1)
      expect(account.reload.balance).to eq(1000)
      expect(response).to have_http_status(:no_content)
    end
  end
end
