module Questions
  class QuestionsSerializer
    include JSONAPI::Serializer
    
    attributes :id, :content, :answer, :status
  end
end
