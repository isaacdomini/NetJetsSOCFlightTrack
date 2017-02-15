class CreateCriticalFlights < ActiveRecord::Migration[5.0]
  def change
    create_table :critical_flights do |t|
      t.string :tail
      t.string :leg
      t.string :source
      t.string :destination
      t.text :event
      t.datetime :etd

      t.timestamps
    end
  end
end
