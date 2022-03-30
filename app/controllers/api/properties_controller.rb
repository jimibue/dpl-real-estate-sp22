class Api::PropertiesController < ApplicationController

    def index
      render json: Property.avaiable
    end
end
