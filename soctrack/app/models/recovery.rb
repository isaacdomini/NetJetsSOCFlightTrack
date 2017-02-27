class Recovery < ApplicationRecord
  belongs_to :flight
  belongs_to :critical_flight
end
