# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

questions = [
  {
    content: "How many letters are there in the English alphabet?",
    answer: "26"
  },
  {
    content: "Calculate 1+1",
    answer: "2"
  },
  {
    content: "What is capital city of Indonesia?",
    answer: "Jakarta"
  }
]

questions.each do |question|
  Question.create(content: question[:content], answer: question[:answer])
end