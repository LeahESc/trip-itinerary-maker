Rails.application.routes.draw do
  resources :trip_categories
  resources :items
  resources :categories
  resources :trips
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
