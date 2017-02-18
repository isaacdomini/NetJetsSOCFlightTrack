class Event < ApplicationRecord
  serialize :event_hash, Hash
end
