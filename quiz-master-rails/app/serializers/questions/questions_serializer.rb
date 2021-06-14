module Questions
  class QuestionsSerializer
    include JSONAPI::Serializer
    
    attributes :id, :content
  end
end
