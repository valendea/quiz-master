require 'rails_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  let(:question) { create :question }

  describe 'GET questions#index' do
    before(:each) do
      create_list :question, 3
      get :index, format: :json
    end

    it 'responds with a success HTTP status' do
      expect(response).to have_http_status(200)
    end

    it 'returns a JSON with correct data' do
      expect(JSON.parse(response.body)["data"].count).to eq(3)
    end
  end

  describe 'GET questions#show' do
    context 'with valid params' do
      before(:each) do
        get :show, params: { id: question.id }, format: :json
      end

      it 'responds with a success HTTP status' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a JSON with correct data' do
        expect(JSON.parse(response.body)["data"]["attributes"]).to include(
          'id' => question.id,
          'content' => question.content,
          'answer' => question.answer
        )
      end
    end

    context 'with invalid params' do
      before(:each) do
        get :show, params: { id: 0000 }, format: :json
      end

      it 'responds with a HTTP status not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns a JSON with message not found' do
        expect(JSON.parse(response.body)).to include(
          'message' => "Question not found"
        )
      end
    end

  end

  describe 'DELETE questions#destroy' do
    context 'with valid params' do
      before(:each) do
        delete :destroy, params: { id: question.id }, format: :json
      end

      it 'responds with a success HTTP status' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a JSON with message success' do
        expect(JSON.parse(response.body)).to include(
          'message' => "Success"
        )
      end
    end

    context 'with invalid params' do
      before(:each) do
        delete :destroy, params: { id: 0000 }, format: :json
      end

      it 'responds with a HTTP status not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns a JSON with message not found' do
        expect(JSON.parse(response.body)).to include(
          'message' => "Question not found"
        )
      end
    end
  end

  describe 'POST questions#create' do
    context 'with valid params' do
      let(:question_params) do
        { 
          "question" => {
            "content" => "Calculate 10+10", "answer" => "100" 
          }
        } 
      end

      before(:each) do
        post :create, params: question_params, format: :json
      end

      it 'responds with a success HTTP status' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a JSON with correct data' do
        expect(JSON.parse(response.body)["data"]["attributes"]).to include(
          'content' => question_params["question"]["content"],
          'answer' => question_params["question"]["answer"]
        )
      end
    end

    context 'with invalid params' do
      let(:question_params) do
        { 
          "question" => { 
            "content" => "Calculate 10+10" 
          }
        } 
      end

      before(:each) do
        post :create, params: question_params, format: :json
      end

      it 'responds with HTTP status unprocessable entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a JSON with message' do
        expect(JSON.parse(response.body)).to include(
          'message' => "Something went wrong"
        )
      end
    end
  end

  describe 'PUT questions#update' do   
    context 'with valid params' do
      let(:question_params) do
        { 
          "id" => question.id,
          "question" => {
            "content" => "Calculate 10+10", 
            "answer" => "100" 
          }
        } 
      end

      before(:each) do
        put :update, params: question_params, format: :json
      end

      it 'responds with a success HTTP status' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns a JSON with correct data' do
        expect(JSON.parse(response.body)["data"]["attributes"]).to include(
          'content' => question_params["question"]["content"],
          'answer' => question_params["question"]["answer"]
        )
      end
    end

    context 'with invalid params' do
      let(:question_params) do
        { 
          "id" => question.id,
          "question" => {
            "key" => 123
          }
        }
      end

      before(:each) do
        put :update, params: question_params, format: :json
      end

      it 'responds with HTTP status unprocessable entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a JSON with message' do
        expect(JSON.parse(response.body)).to include(
          'message' => "Something went wrong"
        )
      end
    end
  end

  describe 'POST questions#check_answer' do
    context 'given correct answer' do
      it 'returns JSON with success message' do
        post :check_answer, params: { id: question.id, question: { answer: question.answer } }, format: :json

        expect(JSON.parse(response.body)).to include({ 'correct' => true })
        expect(response).to have_http_status(:ok)
      end
    end

    context 'given incorrect answer' do
      it 'returns JSON with success message' do
        post :check_answer, params: { id: question.id, question: { answer: 'wrong answer' } }, format: :json

        expect(JSON.parse(response.body)).to include({ 'correct' => false })
        expect(response).to have_http_status(:ok)
      end
    end

    context 'given blank answer' do
      it 'render JSON with error message' do
        post :check_answer, params: { id: question.id, question: { answer: '' } }, format: :json

        expect(JSON.parse(response.body)).to include({ 'message' => 'Something went wrong' })
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
