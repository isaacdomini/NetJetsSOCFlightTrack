class Recovery < ApplicationRecord
  has_one :flight
  belongs_to :critical_flight
end
