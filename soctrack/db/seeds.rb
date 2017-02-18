require 'csv'
require "active_support/core_ext/hash"

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

# csv_text = File.read(Rails.root.join('lib', 'seeds', 'events.csv'))
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

# puts events.keys
# puts ""
# puts events.fetch("ATC")
#
# events.each {|event| Event.new(:event_hash => event).save}

Event.new(:event_hash => events).save


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
