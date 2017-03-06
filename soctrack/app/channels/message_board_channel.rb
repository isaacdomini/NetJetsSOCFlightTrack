class MessageBoardChannel < ApplicationCable::Channel
  def subscribed
     stream_from "messageboard_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
