import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import { renderGalleryImg } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loaderWrapperEl = document.querySelector('.loader-wrapper');
const btnLoadMore = document.querySelector('.btn-more');

const apiKey = '43344529-efab811219d9ae176ef45ef76';
const baseUrl = 'https://pixabay.com/api/';
let page = 1;
let perPage = 15;
let currentSearchQuery = null;
let totalContent = null;
let totalContentPages = null;
let allImages = [];

btnLoadMore.addEventListener('click', onLoadMore);
form.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loaderWrapperEl.classList.remove('is-hidden');

  page = 1;
  perPage = 15;
  const inputValue = document.getElementById('input-text').value.trim();
  currentSearchQuery = inputValue;

  if (inputValue !== '') {
    try {
      const response = await axios.get(
        `${baseUrl}?key=${apiKey}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
      );
      const data = response.data;
      const images = data.hits;
      totalContent = data.totalHits;
      totalContentPages = Math.ceil(totalContent / perPage);

      if (images.length > 0) {
        allImages = images;
        renderGalleryImg(gallery, allImages);
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
  page += 1;

  if (page <= totalContentPages) {
    loaderWrapperEl.classList.remove('is-hidden');
    try {
      const response = await axios.get(
        `${baseUrl}?key=${apiKey}&q=${currentSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
      );
      const images = response.data.hits;
      if (images.length > 0) {
        allImages = [...allImages, ...images];
        renderGalleryImg(gallery, allImages);
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
