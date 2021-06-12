module Questions
  module Services
    class Update
      def self.run(question, params)
        return :not_found, nil if question.nil?
        
        if params.present? && question.update(params)
          return :ok, question
        else
          return :not_ok, nil
        end
      end
    end
  end
end