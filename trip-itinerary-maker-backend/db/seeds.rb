# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create(name: "Nightlife")
Category.create(name: "Restaurants")
Category.create(name: "Museums")
Category.create(name: "Hikes")
Category.create(name: "Tours")
Category.create(name: "Sights")

Trip.create(destination: "Paris")
Trip.create(destination: "Bali")
Trip.create(destination: "Redwood National Park")

