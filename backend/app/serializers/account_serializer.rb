class AccountSerializer < BaseSerializer
  attributes :name, :bank_number, :balance

  has_many :expenses, if: -> { instance_options[:include_expenses] }

  def balance
    object.balance&.to_f
  end
end
