class RemoveFirstNameFromAuthors < ActiveRecord::Migration[5.2]
  def change
    remove_column :authors, :first_name, :string
  end
end
