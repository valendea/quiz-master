require 'rails_helper'

RSpec.describe Questions::Services::Destroy, type: :integration do
  describe ".run" do  
    it "should destroy question" do
      question_1 = create :question 
      status, question = Questions::Services::Destroy.run(question_1)

      expect(status).to eq(:ok)
      expect(question_1.reload.status).to eq(Question::DELETED)
    end
  end
end