require 'csv'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# events = Hash.new
# CSV.foreach("events.csv") do |row|
#   puts row;
# end
# require 'csv'

# hash = Hash[csv_text[0]]
# puts hash
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')

# keys = ['category']
# array = CSV.parse(csv_text).map {|a| Hash[ keys.zip(a) ] }
# array.reduce(&:deep_merge)
# puts array

events =
Hash["ATC"=> ["En Route ATC","Ground Delay Program"],
"Aircraft Related" => ["Ammenities" ,"Speed" ,"Weather/SIGOPS" ,"Luggage Space" ,"Release Problems" ,"Seating"],
"Airport/FBO"=>["De-Ice Delay" ,"Customs/Security" ,"No hangar space" ,"No de-ice available" ,"Early/Late Ops Failed" ,"NOTAM" ,"Slots" ,"Poor Handling" ,"Fuel Late"],
"Company Change"=>["Denied Vendor" ,"Change of Operating Company" ,"Sub-Contract"],
"Crew"=>["Duty","Out of Reach","DNIF/Sick","Travel Delayed","Refused Assignment","Fatigued","Late Check In","Missing Documents","Briefing Problems"],
"Late Positioning"=>["ATC","Aircraft Related","Airport/FBO","Company Change","Crew","Other","Planning","Reschedule","Weather"],
"Maintenance"=>["Vendor Ops Review","MEL (Pax Convenience)","Multiple","Servicing","MEL (Flight Limiting)","Line Extension","In Position","OCF Required (Unscheduled)","At Ferry Point","En Route","Failed OCF"],
"New Booking"=>["At Response Time","Prior to Response Time"],
"Other"=>["Other Uncontrollable","Operational Issues","Peak Period Move","LMAD","Special Event"],
"Passenger"=>["Profile","Previous Pax Late","Misbooking","Earlier ETD","Missing Documents","Later ETD","Itinerary Change","Catering","This Pax Late"],
"Planning"=>["Flight Package Documents","Requested Travel Not Available","Permits","Tight Scheduling"],
"Reschedule"=>["Passenger","Schedule Change","Aircraft Pulled","Hot Spare","New Booking"],
"Weather"=>["En Route Weather","Weather - Arrival","Ferry Point Below Mins","Weather - Departure"]]
Event.new(:event_hash => events).save

# CriticalFlight fake data
# csv_text = File.read('airport-codes.csv')
csv_text = File.read(Rails.root.join('lib', 'seeds', 'airport-codes.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
codes = Array.new
CSV.parse(csv_text).map {|a|  codes.insert(-1,a[0]) if a[1].include?('large') && a[7].include?('US') && !a[2].include?('Air Force')}
#
#
#
# t.string   "tail"
# t.string   "leg"
# t.string   "source"
# t.string   "destination"
# t.text     "event"
# t.datetime "etd"
# t.datetime "created_at",  null: false
# t.datetime "updated_at",  null: false
# t.boolean  "resolved"
for i in 0..249

  randTail = rand(999).to_s.center(3, rand(9).to_s)
  randLeg = rand(99999999).to_s.center(8, rand(9).to_s)
  sourceDest = codes.sample(2);
  randomEvents = Array.new
  for i in 0..rand(0..5)
    randEventType = events.values[rand(events.values.size)]
    selectedEvent = randEventType[rand(randEventType.size)]
    randomEvents.insert(-1,selectedEvent) if !randomEvents.include?(selectedEvent)
  end
  flight = CriticalFlight.new(:tail => "N"+randTail+"QS", :leg => randLeg, :source => sourceDest[0], :destination => sourceDest[1], :event => randomEvents, :etd => rand(3.days).seconds.from_now)
  puts flight
  flight.save
end
# CriticalFlight.new(:tail => "N500QS", :leg => "00000000", :source => "KCMH", :destination =>"KLGA", :event => "En Route Weather", :etd => DateTime.new(2001,2,3.5)).save



domains = ["osu.edu", "gmail.com", "netjets.com"]
roles = ["AB","OS","CS","DX","OPS","MX","ITP","SC"]
lname = ["Buckeye", "Doe", "Bedich", "Nanayakkara", "Bhardwaj", "Domini"]
fname = ["Josh", "Jacob", "Jonathan", "Jared", "John", "Brutus"]
i=0
for r in roles
  for d in domains
    u = User.new(:email => r+"@"+d, :password => 'password', :password_confirmation => 'password', :role => r, :name => fname.sample+" "+lname.sample+" ("+r+")")
    print u.email + " " + u.name;
    u.save
    puts i
    i= i+1
  end
end
