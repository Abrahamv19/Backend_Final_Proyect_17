
const searchIcon = document.getElementById('search-icon');
const searchBox = document.getElementById('search-box');
const searchIconImg = document.getElementById('search-icon-img');
const searchInput = document.getElementById('search-input');
searchIconImg.addEventListener('click', () => {
  if (searchBox.style.display === 'none' || !searchBox.style.display) {
    searchBox.style.display = 'block';
    searchInput.focus();
  } else {
    searchBox.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim();
    const sort = 'asc'; 
    const page = 1; 
    const limit = 10; 


    const searchURL = `/products/filter?title=${searchTerm}&sort=${sort}&page=${page}&limit=${limit}`;

    try {
      window.location.href = searchURL;
    } catch (error) {
      console.error('Hubo un error al redirigir a la página de resultados.', error);
    }
  });
});
