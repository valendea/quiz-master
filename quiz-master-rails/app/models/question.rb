# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  content    :string           not null
#  answer     :string           not null
#  status     :string           default("active"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Question < ApplicationRecord
  ACTIVE = 'active'.freeze
  INACTIVE = 'inactive'.freeze
  DELETED = 'deleted'.freeze
  DEFAULT_STATUSES = [self::ACTIVE, self::INACTIVE].freeze
end
