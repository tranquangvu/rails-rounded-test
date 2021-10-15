class AccountSerializer < BaseSerializer
  attributes :name, :bank_number, :balance

  def balance
    object.balance&.to_f
  end
end
