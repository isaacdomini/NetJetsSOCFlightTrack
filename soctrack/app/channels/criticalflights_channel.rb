class CriticalflightsChannel < ApplicationCable::Channel
  def subscribed
     stream_from "criticalflights_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
