module Questions
  module Services
    class Create
      def self.run(params)
        question = Question.new(content: params[:content],
                                answer: params[:answer])
        
        begin
          return :ok, question if question.save
        rescue ActiveRecord::NotNullViolation
          return :not_ok, nil
        end
      end
    end
  end
end