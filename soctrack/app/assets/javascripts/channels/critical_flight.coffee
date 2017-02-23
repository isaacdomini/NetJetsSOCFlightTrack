App.critical_flight = App.cable.subscriptions.create "CriticalFlightChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    alert(data);
    console.log(data);
