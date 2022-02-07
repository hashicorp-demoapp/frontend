import axios from 'axios'

import { cart } from 'data/cart'

export default async function handler(req, res) {
  res.status(200).json(cart);
}