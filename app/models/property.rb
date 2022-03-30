class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

#   SELECT properties.id, price, beds, sold, city, zip, baths, sq_ft, agent_id, a.first_name, a.last_name, a.email
# FROM properties
# INNER JOIN agents AS a 
# ON a.id = properties.agent_id
# INNER JOIN addresses AS ad 
# ON properties.id = ad.property_id
# WHERE properties.sold <> TRUE;

  def self.avaiable
    select('properties.id, price, beds, sold, city, zip, baths, sq_ft, agent_id, a.first_name, a.last_name, a.email')
    .joins('INNER JOIN agents AS a 
      ON a.id = properties.agent_id
      INNER JOIN addresses AS ad 
      ON properties.id = ad.property_id')
    .where('properties.sold <> TRUE')
  end
end
