class CriticalFlightChannel < ApplicationCable::Channel
  def subscribed
    stream_from "critical_flight_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
