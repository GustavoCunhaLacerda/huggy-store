import fakeApiCall from "../../utils/fakeApiCaller";

export default {
  async list() {
    return await fakeApiCall([
      { name: "Produto 1", price: 1.99, stock: 10 },
      { name: "Produto 2", price: 15.6, stock: 5 },
      { name: "Produto 3", price: 200.0, stock: 0 },
    ]);
  },
};
