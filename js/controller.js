const controller = ((model, view) => {
  const updateView = () => {
    const state = model.getState();
    const paginatedImages = model.getPaginatedImages();
    const totalPages = model.getTotalPages();
    const countries = model.getCountriesByContinent(state.continent);

    view.renderImages(paginatedImages);
    view.renderContinentButtons(model.getContinents(), state.continent);
    view.renderCountryButtons(countries, state.country);

    if (state.isPaginated) {
      view.renderPagination(totalPages, state.currentPage);
    } else {
      view.renderPagination(0, 1);
    }
  };

  const onContinentFilter = (continent) => {
    const isPaginated = continent !== 'all';

    model.setState({
      continent: continent,
      country: 'all',
      searchQuery: '',
      isPaginated: isPaginated,
    });

    view.renderCountryButtons(model.getCountriesByContinent(continent), 'all');

    document.getElementById('search-input').value = '';

    updateView();
  };

  const onCountryFilter = (country) => {
    model.setState({ country: country, searchQuery: '', isPaginated: true });

    document.getElementById('search-input').value = '';

    updateView();
  };

  const onSearch = (query) => {
    model.setState({ searchQuery: query, isPaginated: true });

    updateView();
  };

  const onPageChange = (page) => {
    model.setPage(page);

    updateView();
  };

  // Novo callback para o clique na imagem
  const onImageClick = (imageUrl, title, country, continent) => {
    // Pede à View para exibir a imagem no modal
    view.showExpandedImage(imageUrl, title, country, continent);
  };

  const init = () => {
    view.addEventListeners({
      onContinentFilter,
      onCountryFilter,
      onSearch,
      onPageChange,
      onImageClick, // Adiciona o novo callback
    });

    updateView();
  };

  return { init };
})(model, view);
