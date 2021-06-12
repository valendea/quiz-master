module Api
  module V1
    class QuestionsController < ApplicationController
      before_action :set_question, only: [:show, :update, :destroy, :check_answer]

      def index
        questions, meta = Questions::Queries::All.run
        options = {}

        options[:meta] = meta
        render json: Questions::QuestionsSerializer.new(questions, options).serializable_hash
      end

      def create
        status, question = Questions::Services::Create.run(question_params)
        if status == :ok
          render json: Questions::QuestionsSerializer.new(question).serializable_hash
        else
          render json: { message: "Something went wrong" }, status: :unprocessable_entity
        end
      end

      def show
        if @question.present?
          render json: Questions::QuestionsSerializer.new(@question).serializable_hash
        else
          render json: { message: "Question not found" }, status: :not_found
        end
      end

      def update
        status, question = Questions::Services::Update.run(@question, question_params)
        if status == :ok
          render json: Questions::QuestionsSerializer.new(question).serializable_hash
        elsif status == :not_found
          render json: { message: "Question not found" }, status: :not_found
        else
          render json: { message: "Something went wrong" }, status: :unprocessable_entity
        end
      end

      def destroy
        status = Questions::Services::Destroy.run(@question)
        if status == :ok
          render json: { message: "Success" }, status: :ok
        elsif status == :not_found
          render json: { message: "Question not found" }, status: :not_found
        else
          render json: { message: "Something went wrong" }, status: :unprocessable_entity
        end
      end

      def check_answer
        status, is_correct = Questions::Services::CheckAnswer.run(@question, user_answer_params)
        if status == :ok
          render json: { correct: is_correct }, status: :ok
        elsif status == :not_found
          render json: { message: "Question not found" }, status: :not_found
        else
          render json: { message: "Something went wrong" }, status: :unprocessable_entity
        end
      end

      private

      def set_question
        @question = Question.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        return nil
      end

      def question_params
        params.require(:question).permit(:content, :answer)
      end

      def user_answer_params
        params.require(:question).permit(:answer)
      end
    
    end
  end
end
