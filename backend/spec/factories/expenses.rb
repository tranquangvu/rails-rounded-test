FactoryBot.define do
  factory :expense do
    date { Date.current }
    description { Faker::Lorem.sentence  }
    amount { rand(1..100) }
    association :account
  end
end
