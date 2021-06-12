FactoryBot.define do
  factory :question do
    content { Faker::Lorem.sentence }
    answer { Faker::Lorem.sentence }
    status { Question::ACTIVE }
  end
end