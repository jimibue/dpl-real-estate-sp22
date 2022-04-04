class Agent < ApplicationRecord
    has_many :buyers
    has_many :properties

        # SELECT agents.id, first_name, last_name, email, sold, COUNT(*) as frequency
        # FROM agents
        # INNER JOIN properties AS p ON p.agent_id = agents.id 
        # WHERE sold <> true
        # GROUP BY agents.id, sold
        # ORDER BY COUNT(*) DESC

    def self.unsold_homes
        select("agents.id, first_name, last_name, email, sold, COUNT(*) as frequency")
        .joins("INNER JOIN properties AS p ON p.agent_id = agents.id")
        .where("sold <> true")
        .group("agents.id, sold")
        .order("frequency DESC")
    end
end
