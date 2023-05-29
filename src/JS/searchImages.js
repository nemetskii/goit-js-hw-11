import axios from 'axios';
import Notiflix from 'notiflix';
import { submitBtn, moreBtn } from '.';
export default class SearchEngineService {
  constructor() {
    this.page = 1;
    this.totalPages = 0;
    this.searchQuery = '';
  }
  async fetchPictures() {
    try {
      const encodedQuery = encodeURIComponent(this.searchQuery);
      const response = await axios.get(
        `https://pixabay.com/api/?key=36849792-84f13c987ffd01a72468c0057&q=${encodedQuery}&orientation=horizontal&page=${this.page}&per_page=40&image_type=photo&safesearch=true`
      );
      this.updatePage();
      return response.data;
    } catch {
      console.log('Error!');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      moreBtn.classList.add('is-hidden');
    }
  }
  updatePage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  resetHits() {
    this.endOfHits = false;
  }
  setTotal(total) {
    return (this.totalPages = total);
  }
  getQuery() {
    return this.searchQuery;
  }
  setQuery(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
