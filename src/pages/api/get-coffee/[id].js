import axios from 'axios'
import { coffees } from 'data/coffees'

export default async function handler(req, res) {
  const coffee_id = req.query.id
  
  const coffee = coffees.find(item => item.id == coffee_id)
  
  res.status(200).json(coffee);
}