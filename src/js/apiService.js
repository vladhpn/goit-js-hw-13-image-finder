const baseUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  async fethcArticles(query) {
    const keyApi = '20305682-bc6c61caedc31d9f439895335';
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${keyApi}`;
    const res = await fetch(baseUrl + requestParams);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
  },
  get searchQuerry() {
    return this.query;
  },
  set searchQuerry(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
