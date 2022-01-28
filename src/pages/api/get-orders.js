import axios from 'axios'

import { orders } from 'data/orders'

export default async function handler(req, res) {
  res.status(200).json(orders);
}