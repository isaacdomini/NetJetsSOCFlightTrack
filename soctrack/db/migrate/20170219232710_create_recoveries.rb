class CreateRecoveries < ActiveRecord::Migration[5.0]
  def change
    create_table :recoveries do |t|
      t.string :tail
      t.string :leg, unique: true
      t.boolean :selected, default: false
      t.integer :AB
      t.integer :OS
      t.integer :CS
      t.integer :DX
      t.integer :OPS
      t.integer :MX
      t.integer :ITP
      t.integer :SC

      t.timestamps
    end
  end
end
