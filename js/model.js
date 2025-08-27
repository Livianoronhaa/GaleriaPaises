const model = (() => {
  // Dados de exemplo. Na vida real, isso viria de uma API.
  const imagesData = [
    {
      id: 1,
      title: 'Rio de Janeiro',
      country: 'Brasil',
      continent: 'América do Sul',
      url: 'img/brasil.jpg',
    },
    {
      id: 2,
      title: 'Cataratas do Iguaçu',
      country: 'Brasil',
      continent: 'América do Sul',
      url: 'img/brasil1.webp',
    },
    {
      id: 3,
      title: 'Praia',
      country: 'Brasil',
      continent: 'América do Sul',
      url: 'img/brasil2.jpg',
    },
    {
      id: 4,
      title: 'Salvador - Bahia',
      country: 'Brasil',
      continent: 'América do Sul',
      url: 'img/brasil4.jpg',
    },
    {
      id: 5,
      title: 'Bogotá',
      country: 'Colombia',
      continent: 'América do Sul',
      url: 'img/colombia.jpg',
    },
    {
      id: 6,
      title: 'Cúcuta',
      country: 'Colombia',
      continent: 'América do Sul',
      url: 'img/colombia1.webp',
    },
    {
      id: 7,
      title: 'Buenos Aires',
      country: 'Argentina',
      continent: 'América do Sul',
      url: 'img/argentina.jpg',
    },
    {
      id: 8,
      title: 'Bariloche',
      country: 'Argentina',
      continent: 'América do Sul',
      url: 'img/argentina1.jpg',
    },
    {
      id: 9,
      title: 'Assunção',
      country: 'Paraguai',
      continent: 'América do Sul',
      url: 'img/paraguai.jpg',
    },
    {
      id: 10,
      title: 'Cidade do Leste',
      country: 'Paraguai',
      continent: 'América do Sul',
      url: 'img/paraguai1.webp',
    },
    {
      id: 11,
      title: 'Cataratas Angel',
      country: 'Venezuela',
      continent: 'América do Sul',
      url: 'img/venezuela.jpg',
    },
    {
      id: 12,
      title: 'Deserto do Atacama',
      country: 'Venezuela',
      continent: 'América do Sul',
      url: 'img/venezuela1.webp',
    },
    {
      id: 13,
      title: 'Cataratas Angel',
      country: 'Venezuela',
      continent: 'América do Sul',
      url: 'img/america-do-sul-venezuela-1.jpg',
    },
    {
      id: 14,
      title: 'Deserto do Atacama',
      country: 'Chile',
      continent: 'América do Sul',
      url: 'img/america-do-sul-chile-1.jpg',
    },
    {
      id: 15,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 16,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 17,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 18,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 19,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 20,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 21,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 22,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 23,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 24,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 25,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 26,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
    {
      id: 27,
      title: 'Nome aqui',
      country: 'País aqui',
      continent: 'América do Norte',
      url: 'img/oceania-australia-1.jpg',
    },
  ];

  let currentFilter = {
    continent: 'all',
    country: 'all',
    searchQuery: '',
    isPaginated: true,
  };
  let currentPage = 1;
  const itemsPerPage = 4;

  const getContinents = () => {
    const continents = new Set(imagesData.map((img) => img.continent));
    return ['all', ...Array.from(continents)];
  };

  const getCountriesByContinent = (continent) => {
    if (continent === 'all') return [];
    const countries = new Set(
      imagesData
        .filter((img) => img.continent === continent)
        .map((img) => img.country)
    );
    return ['all', ...Array.from(countries)];
  };

  const getFilteredImages = () => {
    return imagesData.filter((image) => {
      const matchesContinent =
        currentFilter.continent === 'all' ||
        image.continent === currentFilter.continent;
      const matchesCountry =
        currentFilter.country === 'all' ||
        image.country === currentFilter.country;
      const matchesSearch =
        image.title
          .toLowerCase()
          .includes(currentFilter.searchQuery.toLowerCase()) ||
        image.country
          .toLowerCase()
          .includes(currentFilter.searchQuery.toLowerCase());
      return matchesContinent && matchesCountry && matchesSearch;
    });
  };

  const getPaginatedImages = () => {
    const filtered = getFilteredImages();

    if (!currentFilter.isPaginated) {
      return filtered;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  };

  const getTotalPages = () => {
    const filtered = getFilteredImages();

    if (!currentFilter.isPaginated) {
      return 1;
    }

    return Math.ceil(filtered.length / itemsPerPage);
  };

  const setState = (newState) => {
    currentFilter = { ...currentFilter, ...newState };
    currentPage = 1;
  };

  const setPage = (page) => {
    if (currentFilter.isPaginated && page > 0 && page <= getTotalPages()) {
      currentPage = page;
    }
  };

  const getState = () => ({
    ...currentFilter,
    currentPage,
    itemsPerPage,
  });

  return {
    getContinents,
    getCountriesByContinent,
    getPaginatedImages,
    getTotalPages,
    setState,
    setPage,
    getState,
  };
})();
