class Agent < ApplicationRecord
    has_many :buyers
    has_many :properties
end
