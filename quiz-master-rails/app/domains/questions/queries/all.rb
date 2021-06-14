module Questions
  module Queries
    class All
      def self.run(params = nil)
        meta = {}
        questions = Question.where(status: Question::DEFAULT_STATUSES)
        
        meta[:total_all] = questions.size
        meta[:total_active] = questions.where(status: Question::ACTIVE).size
        meta[:total_inactive] = questions.where(status: Question::INACTIVE).size

        questions = by_status(questions, params)
        questions = by_order(questions, params)

        return questions, meta
      end

      private

      def self.by_status(questions, params)
        if params[:status].present?
          questions = questions.where(status: params[:status])
        end
        return questions
      end

      def self.by_order(questions, params)
        questions.order('questions.created_at DESC')
      end

    end
  end
end