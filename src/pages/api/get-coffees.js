import axios from 'axios'

import { coffees } from 'data/coffees'

export default async function handler(req, res) {
  res.status(200).json(coffees);
}