class AddFavoriteToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :favorite, :text
  end
end
