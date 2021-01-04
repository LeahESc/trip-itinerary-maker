class Category < ApplicationRecord
    has_many :items
    has_many :trip_categories
    has_many :trips, through: :trip_categories
end
