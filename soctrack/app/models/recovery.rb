class Recovery < ApplicationRecord
  has_one :flight
  has_and_belongs_to_many :critical_flight
end
