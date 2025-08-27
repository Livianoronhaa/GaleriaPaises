const view = (() => {
  const galleryContainer = document.getElementById('gallery-container');
  const continentButtonsContainer =
    document.getElementById('continent-buttons');
  const countryButtonsContainer = document.getElementById('country-buttons');
  const searchInput = document.getElementById('search-input');
  const paginationContainer = document.getElementById('pagination-container');

  // Novos elementos do modal
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('expanded-image');
  const modalCaption = document.getElementById('image-caption');
  const closeBtn = document.getElementsByClassName('close-btn')[0];

  const renderImages = (images) => {
    // Efeito de fade out
    galleryContainer.style.opacity = 0;
    galleryContainer.style.transform = 'scale(0.98)';

    // Espera a transição terminar antes de renderizar novas imagens
    setTimeout(() => {
      galleryContainer.innerHTML = '';
      images.forEach((image) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.country = image.country;
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <div class="item-info">
                <h3>${image.title}</h3>
                <p>${image.country}, ${image.continent}</p>
            </div>
        `;
        galleryContainer.appendChild(galleryItem);

        // Efeito de fade in
        setTimeout(() => galleryItem.classList.add('show'), 50);
      });
      galleryContainer.style.opacity = 1;
      galleryContainer.style.transform = 'scale(1)';
    }, 300); // tempo de espera da transição
  };

  const renderContinentButtons = (continents, activeContinent) => {
    // Limpa o container antes de renderizar para evitar duplicações
    continentButtonsContainer.innerHTML = '';

    continents.forEach((continent) => {
      const btn = document.createElement('button');

      // Define o texto do botão com base no valor do filtro
      const buttonText = continent === 'all' ? 'Todos' : continent;

      btn.className = `filter-btn ${
        continent === activeContinent ? 'active' : ''
      }`;
      btn.dataset.filter = continent;
      btn.textContent = buttonText;
      continentButtonsContainer.appendChild(btn);
    });
  };

  const renderCountryButtons = (countries, activeCountry) => {
    if (countries.length === 0) {
      countryButtonsContainer.style.display = 'none';
      countryButtonsContainer.innerHTML = '';
      return;
    }

    countryButtonsContainer.style.display = 'flex';
    countryButtonsContainer.innerHTML = ''; // Limpa o container

    countries.forEach((country) => {
      const btn = document.createElement('button');
      const buttonText = country === 'all' ? 'Todos os países' : country;

      btn.className = `filter-btn ${country === activeCountry ? 'active' : ''}`;
      btn.dataset.filter = country;
      btn.textContent = buttonText;
      countryButtonsContainer.appendChild(btn);
    });
  };

  const renderPagination = (totalPages, currentPage) => {
    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      pageBtn.textContent = i;
      pageBtn.dataset.page = i;
      paginationContainer.appendChild(pageBtn);
    }
  };

  // Função para exibir a imagem expandida no modal
  const showExpandedImage = (imageUrl, title, country, continent) => {
    modal.style.display = 'block';
    modalImage.src = imageUrl;
    modalCaption.innerHTML = `<h3>${title}</h3><p>${country}, ${continent}</p>`;
  };

  const addEventListeners = (callbacks) => {
    continentButtonsContainer.addEventListener('click', (e) => {
      if (e.target.matches('.filter-btn')) {
        const continent = e.target.dataset.filter;
        callbacks.onContinentFilter(continent);
      }
    });

    countryButtonsContainer.addEventListener('click', (e) => {
      if (e.target.matches('.filter-btn')) {
        const country = e.target.dataset.filter;
        callbacks.onCountryFilter(country);
      }
    });

    searchInput.addEventListener('input', (e) => {
      callbacks.onSearch(e.target.value);
    });

    paginationContainer.addEventListener('click', (e) => {
      if (e.target.matches('.page-btn')) {
        const page = parseInt(e.target.dataset.page);
        callbacks.onPageChange(page);
      }
    });

    // Listener para abrir o modal ao clicar em uma imagem
    galleryContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        const imageUrl = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;
        const country = item
          .querySelector('p')
          .textContent.split(',')[0]
          .trim();
        const continent = item
          .querySelector('p')
          .textContent.split(',')[1]
          .trim();
        callbacks.onImageClick(imageUrl, title, country, continent);
      }
    });

    // Listener para fechar o modal
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Fechar o modal ao clicar fora dele
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  };

  return {
    renderImages,
    renderContinentButtons,
    renderCountryButtons,
    renderPagination,
    addEventListeners,
    showExpandedImage,
  };
})();
