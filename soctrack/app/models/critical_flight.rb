class CriticalFlight < ApplicationRecord
  has_and_belongs_to_many :recovery
  serialize :event
  validates_uniqueness_of :leg
end
