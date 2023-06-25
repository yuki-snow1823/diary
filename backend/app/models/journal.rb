class Journal < ApplicationRecord
  validates :title, presence: true, length: { minimum: 2 }
  validates :content, exclusion: { in: [nil] }
  belongs_to :user
end
