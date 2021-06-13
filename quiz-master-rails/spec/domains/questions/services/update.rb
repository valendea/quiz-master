require 'rails_helper'

RSpec.describe Questions::Services::Update, type: :integration do
  describe ".run" do  
    let(:question_params) do
      { content: "Calculate 10+10", answer: "20" }
    end

    it "should update question" do
      question_1 = create :question 
      status, question = Questions::Services::Update.run(question_1, question_params)

      expect(status).to eq(:ok)
      expect(question.present?).to eq(true)
    end

    it "should not update question if params is empty" do
      question_2 = create :question 
      status, question = Questions::Services::Update.run(question_2, {})

      expect(status).to eq(:not_ok)
      expect(question).to eq(nil)
    end
  end
end