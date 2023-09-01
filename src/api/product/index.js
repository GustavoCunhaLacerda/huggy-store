import fakeApiCall from "../../utils/fakeApiCaller";
import { products } from "./data";


export default {
  async list() {
    return await fakeApiCall(products);
  },

  async index(id) {
    return products.find(prod => prod.id == id);
  }
};
