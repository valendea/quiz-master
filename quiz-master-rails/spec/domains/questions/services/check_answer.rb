require 'rails_helper'

RSpec.describe Questions::Services::CheckAnswer, type: :integration do
  let(:question) { create(:question) }

  describe ".run" do  
    it "should return true if answer is correct" do
      status, is_correct = Questions::Services::CheckAnswer.run(question, { answer: question.answer })

      expect(status).to eq(:ok)
      expect(is_correct).to eq(true)
    end

    it "should return not found if question is not present" do
      status, is_correct = Questions::Services::CheckAnswer.run(nil, { answer: question.answer })

      expect(status).to eq(:not_found)
      expect(is_correct).to eq(nil)
    end
    
    it "should return unprocessable entity if user answer is empty" do
      status, is_correct = Questions::Services::CheckAnswer.run(question, { answer: "   " })

      expect(status).to eq(:unprocessable_entity)
      expect(is_correct).to eq(nil)
    end
  end
end