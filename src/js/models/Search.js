import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const searchEndpoint = 'https://www.food2fork.com/api/search';
    const apiKey = '2aa1dc5e647018b1409dc0e3d46332b7';
    try {
      const res = await axios(`${searchEndpoint}?key=${apiKey}&q=${this.query}`);
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
