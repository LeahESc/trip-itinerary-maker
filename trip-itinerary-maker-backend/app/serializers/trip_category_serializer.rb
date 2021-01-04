class TripCategorySerializer < ActiveModel::Serializer
  attributes :id, :category_id, :trip_id
  belongs_to :category
  belongs_to :trip
end
