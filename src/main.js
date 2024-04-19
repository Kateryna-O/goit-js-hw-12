import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { renderGalleryImg } from './js/render-functions.js';
import { searchImages } from './js/pixabay-api.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loaderWrapperEl = document.querySelector('.loader-wrapper');
const btnLoadMore = document.querySelector('.btn-more');

let page = 1;
let perPage = 15;
let totalContent = null;
let totalContentPages = null;

btnLoadMore.addEventListener('click', onLoadMore);
form.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loaderWrapperEl.classList.remove('is-hidden');
  page = 1;
  const currentSearchQuery = document.getElementById('input-text').value.trim();

  if (currentSearchQuery !== '') {
    try {
      const response = await searchImages(currentSearchQuery, page);
      const images = response.hits;
      totalContent = response.totalHits;
      totalContentPages = Math.ceil(totalContent / perPage);

      if (images.length > 0) {
        renderGalleryImg(gallery, images);
        btnLoadMore.classList.remove('is-hidden');
      } else {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        btnLoadMore.classList.add('is-hidden');
      }
    } catch (error) {
      console.error('Error searching images:', error);
      iziToast.error({
        title: 'Error',
        message:
          'An error occurred while searching for images. Please try again later.',
      });
    } finally {
      loaderWrapperEl.classList.add('is-hidden');
    }
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term',
    });
    loaderWrapperEl.classList.add('is-hidden');
    btnLoadMore.classList.add('is-hidden');
  }
}

async function onLoadMore(event) {
  const currentSearchQuery = document.getElementById('input-text').value.trim();
  page += 1;
  if (page <= totalContentPages) {
    loaderWrapperEl.classList.remove('is-hidden');
    try {
      const response = await searchImages(currentSearchQuery, page);
      if (response && response.hits && response.hits.length > 0) {
        const images = response.hits;
        renderGalleryImg(gallery, images);
        smoothScrollToGallery();
      } else {
        iziToast.info({
          title: 'Info',
          message: 'No more images available for this search term.',
        });
        btnLoadMore.classList.add('is-hidden');
      }
    } catch (error) {
      console.error('Error loading more images:', error);
      iziToast.error({
        title: 'Error',
        message:
          'An error occurred while loading more images. Please try again later.',
      });
    } finally {
      loaderWrapperEl.classList.add('is-hidden');
    }
  } else {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
    btnLoadMore.classList.add('is-hidden');
  }
}

function smoothScrollToGallery() {
  const galleryHeight = gallery.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryHeight * 2,
    behavior: 'smooth',
  });
}
