Rails.application.routes.draw do

  resources :flights
  resources :recoveries
  resources :events
  devise_for :users
  resources :critical_flights
  devise_scope :user do
    root :to => 'critical_flights#index'
  end
  get '/flight/:leg', to: 'flights#findFlight'
  post '/critical_flight/remove_recovery', to: 'critical_flights#removeRecovery'
  mount ActionCable.server, at: '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
