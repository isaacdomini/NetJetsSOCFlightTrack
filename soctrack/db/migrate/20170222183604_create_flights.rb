class CreateFlights < ActiveRecord::Migration[5.0]
  def change
    create_table :flights do |t|
      t.string :tail
      t.string :leg,   index: true, null: false, unique: true
      t.string :arrival
      t.string :departure
      t.datetime :etd
      t.integer :recovery_id
      t.integer :critical_flight_id

      t.timestamps
    end
  end
end