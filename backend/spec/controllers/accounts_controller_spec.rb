require 'rails_helper'

RSpec.describe AccountsController, type: :controller do
  describe 'GET #index' do
    let!(:accounts) { create_list(:account, 3) }

    it do
      get :index

      expect(response).to have_http_status(:ok)
      expect(json_response.count).to eq(accounts.count)
    end
  end

  describe 'GET #show' do
    let(:account) { create(:account) }

    it do
      get :show, params: { id: account.id }

      expect(response).to have_http_status(:ok)
      expect(json_response['id']).to eq(account.id)
    end
  end

  describe 'POST #create' do
    def do_request
      post :create, params: { account: account_params }
    end

    context 'valid' do
      let(:account_params) { attributes_for(:account, balance: nil) }

      it do
        expect { do_request }.to change(Account, :count).by(1)
        expect(response).to have_http_status(:created)
        expect(json_response['name']).to eq(account_params[:name])
        expect(json_response['bank_number']).to eq(account_params[:bank_number])
        expect(json_response['balance']).to eq(1000)
      end
    end

    context 'invalid' do
      let(:account_params) { attributes_for(:account, name: '', balance: nil) }

      it do
        expect { do_request }.not_to change(Account, :count)
        expect(response).to have_http_status(:bad_request)
        expect(json_response['name']).to include("Name can't be blank")
      end
    end
  end

  describe 'PUT #update' do
    let!(:account) { create(:account) }

    def do_request
      post :update, params: { id: account.id, account: account_params }
    end

    context 'valid' do
      let(:account_params) { { name: 'New name' } }

      it do
        do_request
        expect(response).to have_http_status(:ok)
        expect(account.reload.name).to eq(account_params[:name])
        expect(json_response['name']).to eq(account_params[:name])
      end
    end

    context 'invalid' do
      let(:account_params) { { name: '' } }

      it do
        do_request
        expect(response).to have_http_status(:bad_request)
        expect(json_response['name']).to include("Name can't be blank")
      end
    end
  end

  describe 'DELETE #destroy' do
    def do_request
      delete :destroy, params: { id: account.id }
    end

    let!(:account) { create(:account) }

    it do
      expect { do_request }.to change(Account, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
