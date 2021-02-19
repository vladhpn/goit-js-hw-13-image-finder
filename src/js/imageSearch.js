import servise from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './refs';

refs.searchForm.addEventListener('submit', imageSearchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function imageSearchInputHandler(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  servise.searchQuerry = input.value;

  servise.resetPage();
  refs.loadMoreBtn.classList.add('is-hidden');

  servise.fethcArticles().then((hits) => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
  });
  input.value = '';
}

function loadMoreBtnHandler() {
  servise.fethcArticles().then((hits) => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);

    window.scrollTo({
      top: refs.gallery.scrollHeight,
      behavior: 'smooth',
    });
  });
}
function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function buildListItemsTemplate(items) {
  return cardImeges(items);
}
function clearListItems() {
  refs.gallery.innerHTML = '';
}
