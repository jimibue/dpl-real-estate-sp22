class ChangeBathsToFloat < ActiveRecord::Migration[6.1]
  def change
    change_column :properties, :baths, :float 
  end
end
