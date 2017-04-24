require 'csv'

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
def getProgressBarString(ch, times)
  ret = ""
  for i in 0..times
    ret=ret +ch
  end
  return ret
end
def printProgressUpdate(curr,total)
  fraction = ((curr*60.0)/total)
  print "\r[#{getProgressBarString('=',fraction.to_i)}#{">" if fraction.to_i < 60}#{"=" if fraction.to_i == 60}#{getProgressBarString(' ',(60-fraction).to_i) if fraction.to_i <60}] - #{((fraction*100)/60).round(2)}%"
end


fls = Array.new
puts "\nCREATING FLIGHTS..."
# CREATE FLIGHTS
for i in 0..999
  randTail = rand(999).to_s.center(3, rand(9).to_s)
  randLeg = rand(99999999).to_s.center(8, rand(9).to_s)
  sourceDest = codes.sample(2);
  until !Flight.find_by_leg(randLeg)
    randLeg = rand(99999999).to_s.center(8, rand(9).to_s)
  end
  flight = Flight.new(:tail => "N"+randTail+"QS", :leg => randLeg, :arrival => sourceDest[0], :departure => sourceDest[1], :etd => rand(1.days).seconds.from_now)
  flight.save
  fls << i+1
  printProgressUpdate(i,999);
end

#
# for i in 0..99
#   r =Recovery.new(:flight =>  Flight.find(fls.delete_at(rand(fls.size))))
#   puts r
#   r.save
# end

  randomEvents = Array.new
  for i in 0..rand(0..5)
    randEventType = events.values[rand(events.values.size)]
    selectedEvent = randEventType[rand(randEventType.size)]
    randomEvents.insert(-1,selectedEvent) if !randomEvents.include?(selectedEvent)
  end
# cflight = CriticalFlight.new(:event => randomEvents, :recovery_ids => [1,2,3], :flight_id =>  fls.delete_at(rand(fls.size))).save


fls2 = fls.join("--!--").split("--!--")
# CREATE CriticalFlights
puts "\nCREATING CRITICAL FLIGHTS ..."
for i in 0..99
  randomEvents = Array.new
  randomRecoveries = Array.new
  randR = Array.new
  for j in 0..rand(0..5)
    randEventType = events.values[rand(events.values.size)]
    selectedEvent = randEventType[rand(randEventType.size)]
    randomEvents.insert(-1,selectedEvent) if !randomEvents.include?(selectedEvent)
  end
  cflight = CriticalFlight.new(:event => randomEvents, :flight =>  Flight.find(fls.delete_at(rand(fls.size))))
  cflight.save
  # puts cflight
  # cflight.save
  for k in 0..rand(0..5)
    rf = Flight.find(fls[rand(fls.size)]);
    # while rf.recovery_id
    r = Recovery.new(:flight => Flight.find(rf), :critical_flight => cflight)
    r.save
    r.flight = Flight.find(rf)
    r.save
    randomRecoveries << r.id;
    randR << r
  end
  cflight = nil
  printProgressUpdate(i,99);
end

domains = ["osu.edu", "gmail.com", "netjets.com"]
roles = ["AB","OS","CS","DX","OPS","MX","ITP","SC"]
lname = ["Buckeye", "Doe", "Bedich", "Nanayakkara", "Bhardwaj", "Domini"]
fname = ["Josh", "Jacob", "Jonathan", "Jared", "John", "Brutus","Steve","Bill","Bob","Tom","Phil","Leslie","Gary","Gregg","Geoffrey","Jeffrey","Donald","Mike","Ned","Mary","Lisa","Danielle","Kaitlyn","Umesh"]
i=0
n=0

favs = Array.new

puts "\nCREATING USERS ..."
for r in roles
  for d in domains
    u = User.new(:email => r+"@"+d, :password => 'password', :password_confirmation => 'password', :role => r, :name => fname[n]+" "+lname[n%lname.size], :favorite => favs)
    n = n+1;
    # print u.email + " " + u.name;
    u.save
    # puts i
    i= i+1
    printProgressUpdate(i,24);
  end
end
