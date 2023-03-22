FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "somebody_#{n}" }
    sequence(:nickname) { |n| "some#{n}" }
    sequence(:email) { |n| "somebody_#{n}@example.com" }
    password {'PassW0rd!'}
  end
end
