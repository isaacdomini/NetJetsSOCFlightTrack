require 'csv'

csv_text = File.read('airport-codes.csv')
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
codes = Array.new
array = CSV.parse(csv_text).map {|a|  codes.insert(-1,a[0]) if a[1].include?('large') && a[7].include?('US') && !a[2].include?('Air Force')}
# array.reduce(&:deep_merge)
puts codes
