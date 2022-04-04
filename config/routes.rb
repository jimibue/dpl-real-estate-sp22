Rails.application.routes.draw do
  # generates all devise routes
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get '/properties', to:'properties#index'
    get '/properties/cities', to:'properties#cities'
    get '/properties/:city', to: 'properties#city'

    get '/agents', to:'agents#index'
    get '/agents/:id', to:'agents#show'

    get 'buyers/:id', to: 'buyers#show'
    get 'buyers1/:id', to: 'buyers#show1'
  end
end
