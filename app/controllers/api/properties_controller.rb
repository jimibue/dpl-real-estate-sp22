class Api::PropertiesController < ApplicationController

    def index
      render json: Property.available
    end

    def cities
      render json: Address.cities
    end
    
    def city
      render json: Property.city(params[:city])
    end

    def city_cost
      render json: Property.city_cost
    end
end
