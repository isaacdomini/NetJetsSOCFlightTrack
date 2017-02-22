Rails.application.routes.draw do

  devise_for :users
  resources :critical_flights
  devise_scope :user do
    root :to => 'critical_flights#index'
  end

	#notifies app about actioncable server
	mount ActionCable.server, at: '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
