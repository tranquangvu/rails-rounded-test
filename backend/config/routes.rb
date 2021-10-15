Rails.application.routes.draw do
  resources :accounts, only: %i[index show create update destroy]
  resources :expenses, only: %i[index show create update destroy]
end
