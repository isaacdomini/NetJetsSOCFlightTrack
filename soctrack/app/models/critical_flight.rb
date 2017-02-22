class CriticalFlight < ApplicationRecord
  has_one :flight
  has_and_belongs_to_many :recovery
  serialize :event
end
