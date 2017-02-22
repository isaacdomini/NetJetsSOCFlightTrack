json.extract! flight, :id, :tail, :leg, :arrival, :departure, :etd, :created_at, :updated_at
json.url flight_url(flight, format: :json)