class Api::PropertiesController < ApplicationController
    before_action :set_page, only: [:city]

    def index
      render json: Property.available
    end

    def cities
      render json: Address.cities
    end
    
    def city
      # before kaminara
      # render json: Property.city(params[:city])
      # here properties is going to be res.data
      
      # after
      #.page is given with kaminara gem, given us back 25 enteries per 'page'
      properties = Property.page(@page).city(params[:city])
      total_pages = properties.total_pages
      render json: {properties: properties, total_pages: total_pages }
      # here properties is going to be res.data.properties
    end

    def city_cost
      render json: Property.city_cost
    end

    def set_page
      @page = params[:page] || 1
      # @page = params[:page] ? params[:page]  : 1
    end
end
