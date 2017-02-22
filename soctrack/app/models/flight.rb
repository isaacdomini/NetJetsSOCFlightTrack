class Flight < ApplicationRecord
  belongs_to :critical_flight
  belongs_to :recovery
end
