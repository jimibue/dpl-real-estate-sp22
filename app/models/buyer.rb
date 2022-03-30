class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array
end
