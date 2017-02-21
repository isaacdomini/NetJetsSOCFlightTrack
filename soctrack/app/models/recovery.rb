class Recovery < ApplicationRecord
  has_and_belongs_to_many :critical_flights
end
