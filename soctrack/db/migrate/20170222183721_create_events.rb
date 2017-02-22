class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.text :event_hash

      t.timestamps
    end
  end
end
