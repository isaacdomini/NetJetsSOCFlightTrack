json.extract! critical_flight, :id, :tail, :leg, :source, :destination, :event, :etd, :created_at, :updated_at
json.url critical_flight_url(critical_flight, format: :json)