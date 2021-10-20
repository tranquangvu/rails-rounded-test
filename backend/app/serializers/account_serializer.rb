# == Schema Information
#
# Table name: accounts
#
#  id           :integer          not null, primary key
#  balance      :decimal(8, 2)
#  bank_number  :string
#  lock_version :integer
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class AccountSerializer < BaseSerializer
  attributes :name, :bank_number, :balance

  has_many :expenses, if: -> { instance_options[:include_expenses] }

  def balance
    object.balance&.to_f
  end
end
