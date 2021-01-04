class TripCategorySerializer < ActiveModel::Serializer
  attributes :id, :category_id, :trip_id
end
