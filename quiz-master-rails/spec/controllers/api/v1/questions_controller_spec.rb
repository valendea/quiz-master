require 'rails_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  let(:question) { create :question }

  describe 'GET questions#index' do
    before(:each) do
      create_list :question, 3
    end

    it 'responds with a success HTTP status' do
      get :index, format: :json

      expect(response).to have_http_status(200)
    end

    it 'returns a JSON with correct data' do
      get :index, format: :json

      expect(JSON.parse(response.body)["data"].count).to eq(3)
    end
  end

  describe 'GET questions#show' do
    context 'with valid params' do
      it 'responds with a success HTTP status' do
        get :show, params: { id: question.id }, format: :json

        expect(response).to have_http_status(:ok)
      end

      it 'returns a JSON with correct data' do
        get :show, params: { id: question.id }, format: :json

        expect(JSON.parse(response.body)["data"]["attributes"]).to include(
          'id' => question.id,
          'content' => question.content,
          'answer' => question.answer
        )
      end
    end

    context 'with invalid params' do
      it 'responds with a HTTP status not found' do
        get :show, params: { id: 0000 }, format: :json

        expect(response).to have_http_status(:not_found)
      end

      it 'returns a JSON with message not found' do
        get :show, params: { id: 0000 }, format: :json

        expect(JSON.parse(response.body)).to include(
          'message' => "Question not found"
        )
      end
    end

  end

  describe 'DELETE questions#destroy' do
    context 'with valid params' do
      it 'responds with a success HTTP status' do
        delete :destroy, params: { id: question.id }, format: :json

        expect(response).to have_http_status(:ok)
      end

      it 'returns a JSON with message success' do
        delete :destroy, params: { id: question.id }, format: :json

        expect(JSON.parse(response.body)).to include(
          'message' => "Success"
        )
      end
    end

    context 'with invalid params' do
      it 'responds with a HTTP status not found' do
        delete :destroy, params: { id: 0000 }, format: :json

        expect(response).to have_http_status(:not_found)
      end

      it 'returns a JSON with message not found' do
        delete :destroy, params: { id: 0000 }, format: :json

        expect(JSON.parse(response.body)).to include(
          'message' => "Question not found"
        )
      end
    end
  end
end
