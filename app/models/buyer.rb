class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array

#   SELECT buyers.first_name, max_price,cities, a.email, sq_ft, city, price, sold
# from buyers
# INNER JOIN agents AS a ON a.id = buyers.agent_id
# INNER JOIN properties AS p ON p.agent_id = buyers.agent_id AND p.price < buyers.max_price 
# INNER JOIN addresses AS ad ON ad.property_id = p.id AND ad.city = ANY ('{"SLC"}')
# WHERE buyers.id = 9 AND p.sold <> TRUE

  # class method implementaion self.method_name is a class method in ruby
  # self here refers to the class
  def self.my_homes(id, cities)
     select('p.id, sq_ft, city, price')
     .joins("INNER JOIN agents AS a ON a.id = buyers.agent_id
      INNER JOIN properties AS p ON p.agent_id = buyers.agent_id AND p.price < buyers.max_price 
      INNER JOIN addresses AS ad ON ad.property_id = p.id  AND ad.city = ANY ('{#{cities.join(',')}}')")
    .where("buyers.id = ? AND p.sold <> TRUE", id)
  end

  #instance
  def my_homes
      # self here refers to the the instance (1) thing of the class
    {id:self.id, cities:self.cities, method_type:'instance'}
  end
end
