module Questions
  module Services
    class CheckAnswer
      def self.run(question, params)
        return :not_found, nil if question.nil?
        return :unprocessable_entity, nil if params[:answer].empty?

        user_answer = sanitize_answer(params[:answer])
        real_answer = sanitize_answer(question.answer)

        return :ok, is_correct?(user_answer, real_answer)
      end

      private

      def self.sanitize_answer(answer)
        answer = answer.to_s.downcase.strip
        return to_words(answer)
      end

      def self.to_words(answer)
        number = Integer(answer)
        return number.humanize.gsub(/-/, " ")
      rescue ArgumentError
        return answer
      end

      def self.is_correct?(user_answer, real_answer)
        user_answer == real_answer
      end
    end
  end
end