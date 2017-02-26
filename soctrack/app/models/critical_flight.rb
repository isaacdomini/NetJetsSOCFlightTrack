class CriticalFlight < ApplicationRecord
  has_one :flight
  has_many :recovery
  serialize :event
end
