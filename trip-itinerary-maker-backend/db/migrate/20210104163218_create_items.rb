class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :category_id
      t.integer :trip_id
      t.timestamps
    end
  end
end
