require 'rails_helper'

RSpec.describe Questions::Services::CheckAnswer, type: :integration do
  describe ".run" do  
    before(:each) do
      [Question::ACTIVE, Question::INACTIVE, Question::DELETED].each do |status|
        create(:question, status: status)
      end
    end
    
    it "should return all default status questions" do
      questions, meta = Questions::Queries::All.run({ status: "" })

      expect(questions.present?).to eq(true)
      expect(questions.length).to eq(2)
      expect(meta[:total_all]).to eq(2)
      expect(meta[:total_active]).to eq(1)
      expect(meta[:total_inactive]).to eq(1)
    end
    
    it "should return questions if params status is active" do
      questions, meta = Questions::Queries::All.run({ status: Question::ACTIVE })

      expect(questions.present?).to eq(true)
      expect(questions.length).to eq(1)
      expect(meta[:total_all]).to eq(2)
      expect(meta[:total_active]).to eq(1)
      expect(meta[:total_inactive]).to eq(1)
    end
  end
end