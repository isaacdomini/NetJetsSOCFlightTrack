class CriticalFlight < ApplicationRecord
  serialize :event
  validates_uniqueness_of :leg
end
