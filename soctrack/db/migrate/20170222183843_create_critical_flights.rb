class CreateCriticalFlights < ActiveRecord::Migration[5.0]
  def change
    create_table :critical_flights do |t|
      t.text :event
      t.boolean :resolved, default: false

      t.timestamps
    end
  end
end
