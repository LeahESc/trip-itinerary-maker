class Trip < ApplicationRecord
    has_many :trip_categories
    has_many :categories, through: :trip_categories
end
