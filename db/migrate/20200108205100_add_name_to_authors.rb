class AddNameToAuthors < ActiveRecord::Migration[5.2]
  def change
    add_column :authors, :name, :string
  end
end
