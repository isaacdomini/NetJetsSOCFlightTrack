App.critical_flight = App.cable.subscriptions.create "CriticalFlightChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    console.log("received");
    criticalFlightData.push(data.content);
    console.log("pushed to table");
    table.ajax.reload()
    console.log("tried first method")
    $('#flightsTable').DataTable().ajax.reload();
    console.log("tried second method")
