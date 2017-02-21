class CreateJoinTableCriticalFlightsRecoveries < ActiveRecord::Migration[5.0]
  def change
    create_join_table :critical_flights, :recoveries do |t|
      t.index [:critical_flight_id, :recovery_id], :name => "critical_flight_id_recovery_id_index"
      t.index [:recovery_id, :critical_flight_id], :name => "recovery_id_critical_flight_id_index"
    end
  end
end
