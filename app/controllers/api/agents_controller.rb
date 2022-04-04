class Api::AgentsController < ApplicationController

    def index
      render json: Agent.unsold_homes
    end
end
