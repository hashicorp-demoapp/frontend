export const orders = [
  {
    id: 1,
    total: 1700,
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
    items: [
      {
        id: 1,
        amount: 2,
        price: 700,
        coffee: [
          {
            id: 2,
            color: "#1FA7EE",
            name: "Packer Spiced Latte",
            teaser: "Packed with goodness to spice up your images",
            description: "",
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
        id: 2,
        amount: 3,
        price: 750,
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
      {
        id: 3,
        amount: 1,
        price: 250,
        coffee: [
          {
            id: 9,
            color: "#14C6CB",
            name: "Waypointiato",
            teaser: "Deploy with a little foam",
            description: "",
            origin: "Fall 2020",
            collection: "Discoveries",
            price: 250,
            image: "/waypoint.png",
            ingredients: [{ ingredient_id: 1 }, { ingredient_id: 2 }],
          }
        ]
      },
    ]
  },
  {
    id: 2,
    total: 950,
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
    items: [
      {
        id: 1,
        amount: 1,
        price: 200,
        coffee: [
          {
            id: 1,
            color: "#444",
            name: "HCP Aeropress",
            teaser: "Automation in a cup",
            description: "",
            origin: "Summer 2020",
            collection: "Foundations",
            price: 200,
            image: "/hashicorp.png",
            ingredients: [{ ingredient_id: 6 }],
          },
        ]
      },
      {
        id: 2,
        amount: 3,
        price: 750,
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
    ]
  },
  {
    id: 3,
    total: 1800,
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
    items: [
      {
        id: 1,
        amount: 2,
        price: 400,
        coffee: [
          {
            id: 3,
            color: "#FFD814",
            name: "Vaulatte",
            teaser: "Nothing gives you a safe and secure feeling like a Vaulatte",
            description: "",
            origin: "Spring 2015",
            collection: "Foundations",
            price: 200,
            image: "/vault.png",
            ingredients: [{ ingredient_id: 1 }, { ingredient_id: 2 }],
          }
        ]
      },
      {
        id: 2,
        amount: 1,
        price: 350,
        coffee: [
          {
            id: 9,
            color: "#14C6CB",
            name: "Waypointiato",
            teaser: "Deploy with a little foam",
            description: "",
            origin: "Fall 2020",
            collection: "Discoveries",
            price: 250,
            image: "/waypoint.png",
            ingredients: [{ ingredient_id: 1 }, { ingredient_id: 2 }],
          }
        ]
      },
      {
        id: 3,
        amount: 4,
        price: 600,
        coffee: [
          {
            id: 5,
            color: "#894BD1",
            name: "Terraspresso",
            teaser: "Nothing kickstarts your day like a provision of Terraspresso",
            description: "",
            origin: "Summer 2014",
            collection: "Origins",
            price: 150,
            image: "/terraform.png",
            ingredients: [{ ingredient_id: 1 }],
          }
        ]
      },
      {
        id: 4,
        amount: 3,
        price: 450,
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
    ]
  },
];
