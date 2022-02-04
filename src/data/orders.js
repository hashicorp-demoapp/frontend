export const orders = [
  {
    id: 1,
    card: "4444 4444 4444 4444",
    status: [
      {
        state: "success",
        message: "Payment processed",
      } 
    ],
    encryption: [
      {
        state: "fail",
        message: "Encryption disabled",
      } 
    ],
    coffee: [
      {
        id: 4,
        color: "#00CA8E",
        name: "Nomadicano",
        teaser: "Drink one today and you will want to schedule another",
        description: "",
        origin: "Fall 2015",
        collection: "Foundations",
        price: 150,
        image: "/nomad.png",
        ingredients: [{ ingredient_id: 1 }, { ingredient_id: 3 }],
      }
    ]
  },
  {
    id: 2,
    card: "4444 4444 4444 4444",
    status: [
      {
        state: "success",
        message: "Payment processed",
      } 
    ],
    encryption: [
      {
        state: "fail",
        message: "Encryption disabled",
      } 
    ],
    coffee: [
      {
        id: 2,
        color: "#1FA7EE",
        name: "Packer Spiced Latte",
        teaser: "Packed with goodness to spice up your images",
        description: "",
        origin: "Summer 2013",
        collection: "Origins",
        price: 350,
        image: "/packer.png",
        ingredients: [
          { ingredient_id: 1 },
          { ingredient_id: 2 },
          { ingredient_id: 4 },
        ],
      }
    ]
  },
  {
    id: 3,
    card: "4444 4444 4444 4444",
    status: [
      {
        state: "success",
        message: "Payment processed",
      } 
    ],
    encryption: [
      {
        state: "fail",
        message: "Encryption disabled",
      } 
    ],
    coffee: [
      {
        id: 7,
        color: "#F44D8A",
        name: "Connectaccino",
        teaser: "Discover the wonders of our meshy service",
        description: "",
        origin: "Spring 2014",
        collection: "Origins",
        price: 250,
        image: "/consul.png",
        ingredients: [{ ingredient_id: 1 }, { ingredient_id: 5 }],
      }
    ]
  },
];
