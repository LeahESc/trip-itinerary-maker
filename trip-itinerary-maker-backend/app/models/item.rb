class Item < ApplicationRecord
    belongs_to :category
    belongs_to :trip
    accepts_nested_attributes_for :category, :reject_if => lambda { |a| a[:name].blank? }, :allow_destroy => true

end
