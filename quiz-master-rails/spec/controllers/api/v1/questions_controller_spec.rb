require 'rails_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  describe 'GET #index' do
    before(:each) do
      create_list :question, 3
    end

    it 'returns a JSON with correct data' do
      get :index, format: :json

      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)["data"].count).to eq(3)
    end
  end
end
