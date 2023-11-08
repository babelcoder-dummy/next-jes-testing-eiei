import { HttpResponse, http } from 'msw';
import { products } from '../data/products';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const handlers = [
  http.get(`${baseURL}/v1/products`, () => {
    return HttpResponse.json(products);
  }),
];

export default handlers;
