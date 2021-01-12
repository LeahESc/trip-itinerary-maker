class TripCategoriesController < ApplicationController
    def index 
        tripcategories = TripCategory.all
        render json: tripcategories
    end 
    def create
        # binding.pry
        trip_category = TripCategory.new(trip_category_params)
       
        if trip_category.save
            @category = Category.find(trip_category.category_id)
          render json: @category, status: :created, location: @category
        else
          render json: @trip_category.errors, status: :unprocessable_entity
        end
      end


    private
    # Use callbacks to share common setup or constraints between actions.

    # Only allow a trusted parameter "white list" through.
    def trip_category_params
      params.require(:trip_category).permit(
      :category_id,
      :trip_id
      )
    end
end
