class CreateRecoveries < ActiveRecord::Migration[5.0]
  def change
    create_table :recoveries do |t|
      t.boolean :selected, default: false
      t.integer :AB, default: 0
      t.integer :OS, default: 0
      t.integer :CS, default: 0
      t.integer :DX, default: 0
      t.integer :OPS, default: 0
      t.integer :MX, default: 0
      t.integer :ITP, default: 0
      t.integer :SC, default: 0
      t.timestamps
    end
  end
end
