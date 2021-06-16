require 'rails_helper'

RSpec.describe Questions::Services::CheckAnswer, type: :integration do
  let(:question) { create(:question) }
  let(:question_2) { create(:question, answer: "TWO") }
  let(:question_3) { create(:question, answer: "3") }

  describe ".run" do  
    it "should return true if answer is correct" do
      status, is_correct = Questions::Services::CheckAnswer.run(question, { answer: question.answer })

      expect(status).to eq(:ok)
      expect(is_correct).to eq(true)
    end
    
    it "should return true if answer is in number" do
      status, is_correct = Questions::Services::CheckAnswer.run(question_2, { answer: "2" })

      expect(status).to eq(:ok)
      expect(is_correct).to eq(true)
    end
    
    it "should return true if answer is lowercase" do
      status, is_correct = Questions::Services::CheckAnswer.run(question_2, { answer: "two" })

      expect(status).to eq(:ok)
      expect(is_correct).to eq(true)
    end
    
    it "should return true if answer is mixed letter case" do
      status, is_correct = Questions::Services::CheckAnswer.run(question_2, { answer: "tWo" })

      expect(status).to eq(:ok)
      expect(is_correct).to eq(true)
    end
    
    it "should return true if answer has extra whitespace" do
      status, is_correct = Questions::Services::CheckAnswer.run(question_2, { answer: "      two     " })

      expect(status).to eq(:ok)
      expect(is_correct).to eq(true)
    end

    it "should return true if answer is in words" do
      status, is_correct = Questions::Services::CheckAnswer.run(question_3, { answer: "three" })

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