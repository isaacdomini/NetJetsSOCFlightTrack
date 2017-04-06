Rails.application.routes.draw do

  resources :flights
  resources :recoveries
  resources :events
  devise_for :users
  resources :critical_flights
  devise_scope :user do
    root :to => 'critical_flights#index'
  end

  post '/critical_flight/accept_recovery', to: 'critical_flights#acceptRecovery'
  post '/critical_flight/remove_recovery', to: 'critical_flights#removeRecovery'
  post '/critical_flight/add_recovery', to: 'critical_flights#addRecovery'
  post '/critical_flight/recovery_reaction', to: 'critical_flights#changeRecoveryReaction'
  post '/user/update_favorites', to: 'critical_flights#updateFavorites'
  mount ActionCable.server, at: '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
