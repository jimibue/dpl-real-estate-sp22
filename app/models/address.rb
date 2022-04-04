class Address < ApplicationRecord
  belongs_to :property

  def self.cities
    cities = select("DISTINCT city")
    cities.map do |city|
      city.city
    end
  end
end
