# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
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
