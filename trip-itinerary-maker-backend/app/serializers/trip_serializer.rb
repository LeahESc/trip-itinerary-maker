class TripSerializer < ActiveModel::Serializer
  attributes :id, :destination
  
  has_many :trip_categories
  has_many :categories, through: :trip_categories
end
