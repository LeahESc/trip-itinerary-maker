class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :category
  belongs_to :trip

end
