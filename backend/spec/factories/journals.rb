FactoryBot.define do
  factory :journal do
    association :user
    title { "Journal title" }
    content { "Journal content" }
  end
end
