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

  def self.available
    select('properties.id, price, beds, sold, city, zip, baths, sq_ft, street, agent_id, a.first_name, a.last_name, a.email')
    .joins('INNER JOIN agents AS a 
      ON a.id = properties.agent_id
      INNER JOIN addresses AS ad 
      ON properties.id = ad.property_id')
    .where('properties.sold <> TRUE')
  end

  def self.city(city)
     select("properties.id, price, baths, sq_ft, beds, a.city")
     .joins("INNER JOIN addresses AS a ON properties.id = a.property_id")
     .where("LOWER(a.city) = ? AND properties.sold <> ?", city.downcase, true)
  end

#   SELECT DISTINCT city, STRING_AGG(CAST(price AS VARCHAR), ', ') as prices, COUNT(*) price_count 
# FROM properties INNER JOIN addresses AS ad ON properties.id = ad.property_id
# WHERE properties.sold IS TRUE GROUP BY city

  def self.city_cost
    select("DISTINCT city, STRING_AGG(CAST(price AS VARCHAR), ', ') as prices, COUNT(*) price_count ")
    .joins('INNER JOIN addresses AS ad ON properties.id = ad.property_id')
    .where('properties.sold IS TRUE')
    .group('city')
  end
end
