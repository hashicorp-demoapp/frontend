import axios from 'axios'
import { orders } from 'data/orders'

export default async function handler(req, res) {
  const order_id = req.query.id
  
  const order = orders.find(item => item.id == order_id)
  
  res.status(200).json(order);
}