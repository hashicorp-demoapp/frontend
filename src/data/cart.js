export const cart = [
  {
    id: 1,
    items: 2,
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
    items: 3,
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
    items: 1,
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
];
