Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :questions do
        member do
          post 'check-answer', to: 'questions#check_answer'
        end
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end