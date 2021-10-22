FactoryBot.define do
  factory :account do
    name { Faker::Name.name }
    bank_number { Faker::Bank.account_number }
    balance { 10000 }
  end
end
