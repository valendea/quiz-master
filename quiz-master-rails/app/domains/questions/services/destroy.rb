module Questions
  module Services
    class Destroy
      def self.run(question)
        return :not_ok if question.nil?
  
        if question.update(status: Question::DELETED)
          return :ok
        else
          return :not_ok
        end
      end
    end
  end
end