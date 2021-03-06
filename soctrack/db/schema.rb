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

ActiveRecord::Schema.define(version: 20170406000000) do

  create_table "critical_flights", force: :cascade do |t|
    t.text     "event"
    t.boolean  "resolved",   default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "events", force: :cascade do |t|
    t.text     "event_hash"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flights", force: :cascade do |t|
    t.string   "tail"
    t.string   "leg",                null: false
    t.string   "arrival"
    t.string   "departure"
    t.datetime "etd"
    t.integer  "critical_flight_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["leg"], name: "index_flights_on_leg"
  end

  create_table "recoveries", force: :cascade do |t|
    t.boolean  "selected",           default: false
    t.integer  "critical_flight_id",                 null: false
    t.integer  "flight_id",                          null: false
    t.integer  "AB",                 default: 0
    t.integer  "OS",                 default: 0
    t.integer  "CS",                 default: 0
    t.integer  "DX",                 default: 0
    t.integer  "OPS",                default: 0
    t.integer  "MX",                 default: 0
    t.integer  "ITP",                default: 0
    t.integer  "SC",                 default: 0
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
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
    t.text     "favorite"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
