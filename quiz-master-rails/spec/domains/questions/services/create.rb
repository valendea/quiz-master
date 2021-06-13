require 'rails_helper'

RSpec.describe Questions::Services::Create, type: :integration do
  describe ".run" do
    let(:question_params) do
      { content: "Calculate 10+10", answer: "20" }
    end

    let(:missing_content_params) do
      { answer: "20" }
    end
    
    let(:missing_answer_params) do
      { content: "Calculate 10+10" }
    end

    it "should create new question" do
      status, question = Questions::Services::Create.run(question_params)

      expect(status).to eq(:ok)
      expect(question.present?).to eq(true)
    end

    it "should not create question if content params is missing" do
      status, question = Questions::Services::Create.run(missing_content_params)

      expect(status).to eq(:not_ok)
      expect(question.present?).to eq(false)
    end
    
    it "should not create question if answer params is missing" do
      status, question = Questions::Services::Create.run(missing_answer_params)

      expect(status).to eq(:not_ok)
      expect(question.present?).to eq(false)
    end
  end
end