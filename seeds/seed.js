require("../lib/mongodb.config")
const User = require("../model/user.model")
const Owner = require("../model/owner.model")


User.insertMany([
    {
        firstname: "Daryl",
        lastname: "Watanaprasit",
        email: "123@gmail.com",
        password: "12345678",
        address: {
            unit: "42",
            streetname: "Seletar Road",
            postalcode: "123456"
        },
        foodcart: [],
    },
    {
        firstname: "Hee Seung",
        lastname: "Kim",
        email: "234@gmail.com",
        password: "12345678",
        address: {
            unit: "12",
            streetname: "Changi Road",
            postalcode: "908765"
        },
        foodcart: [
            {
            foodname: "Chicken Wing",
            foodprice: 1.50,
            quantity: 12
            },
            {
                foodname: "Chicken Nuggets",
                foodprice: 0.05,
                quantity: 100
            },
            {
                foodname: "Carbonara",
                foodprice: 4,
                quantity: 10
            }],
    },
    {
        firstname: "Eugene",
        lastname: "Chua",
        email: "345@gmail.com",
        password: "12345678",
        address: {
            unit: "42",
            streetname: "Seletar Road",
            postalcode: "123456"
        },
        isAdmin: false,
        foodcart: [
            {
            foodname: "Chicken Wing",
            foodprice: 1.50,
            quantity: 12
            },
            {
                foodname: "Chicken Nuggets",
                foodprice: 0.05,
                quantity: 100
            },
            {
                foodname: "Carbonara",
                foodprice: 4,
                quantity: 10
            }

        ]
    }
], {
    timestamps: true
}).then(() => {
    console.log("Completed Seeding")
}).catch(e=> {
    console.log("Seeding failed. ")
})

Owner.insertMany([
    {
        firstname: "Daryl",
        lastname: "Watanaprasit",
        email: "abc@gmail.com",
        password: "12345678",
        address: {
            unit: "42",
            streetname: "Seletar Road",
            postalcode: "123456"
        },
        restaurantname: "Sap Sap Thai",
        restaurantaddress: {
            unit: "42",
            streetname: "Seletar Road",
            postalcode: "123456"
        },
        foodlist: [{
            name: "Bolognese",
            description: "Smelly balls",
            price: 8
        }],
        foodImages: "Nil"
    },
    {
        firstname: "Eugene",
        lastname: "Chua",
        email: "bcd@gmail.com",
        password: "12345678",
        address: {
            unit: "42",
            streetname: "Christmas Road",
            postalcode: "123456"
        },
        restaurantname: "Sassy",
        restaurantaddress: {
            unit: "42",
            streetname: "Chinese New year Road",
            postalcode: "123456"
        },
        foodlist: [
            {
            name: "Goreng Pisang",
            description: "Smelly bananas",
            price: 2.50
            },
            {
                name: "Nasi Lemak",
                description: "Smelly Rice",
                price: 4
            },
            {
                name: "Mee Goreng",
                description: "Smelly noodles",
                price: 4
            }
            ],
        foodImages: "Nil"
    },
    {
        firstname: "Hee Seung",
        lastname: "Kim",
        email: "cde@gmail.com",
        password: "12345678",
        address: {
            unit: "12",
            streetname: "Mini Golf Road",
            postalcode: "123456"
        },
        restaurantname: "Sap Sap Thai",
        restaurantaddress: {
            unit: "5a",
            streetname: "Shark Week Road",
            postalcode: "123456"
        },
        foodlist: [{
            name: "Budae Jiggae",
            description: "Smelly Soup",
            price: 25
        }],
        foodImages: "Nil"
    }
])