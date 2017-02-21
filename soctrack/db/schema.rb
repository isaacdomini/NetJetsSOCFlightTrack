# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170219234914) do

  create_table "critical_flights", force: :cascade do |t|
    t.string   "tail"
    t.boolean  "resolved",    default: false
    t.string   "leg"
    t.string   "source"
    t.string   "destination"
    t.text     "event"
    t.datetime "etd"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "critical_flights_recoveries", id: false, force: :cascade do |t|
    t.integer "critical_flight_id", null: false
    t.integer "recovery_id",        null: false
    t.index ["critical_flight_id", "recovery_id"], name: "critical_flight_id_recovery_id_index"
    t.index ["recovery_id", "critical_flight_id"], name: "recovery_id_critical_flight_id_index"
  end

  create_table "events", force: :cascade do |t|
    t.text "event_hash"
  end

  create_table "recoveries", force: :cascade do |t|
    t.string   "tail"
    t.string   "leg"
    t.boolean  "selected",   default: false
    t.integer  "AB"
    t.integer  "OS"
    t.integer  "CS"
    t.integer  "DX"
    t.integer  "OPS"
    t.integer  "MX"
    t.integer  "ITP"
    t.integer  "SC"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "role"
    t.string   "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
