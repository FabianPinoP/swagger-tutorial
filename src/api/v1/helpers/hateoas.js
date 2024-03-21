const prepareHateoas = async (entity, data, items, page) => {
  const pageInt = Number(page);
  const itemsInt = Number(items);

  // se calculan los índices de inicio y fin para la porción de datos paginada
  const startIndex = (pageInt - 1) * itemsInt;
  const endIndex = pageInt * itemsInt;

  const results = data
    .map((v) => {
      return {
        destino: v.destino,
        href: `/api/v1/${entity}/${v.id}`,
      };
    })
    .slice(startIndex, endIndex);
  const total = data.length;
  const nextUrl = `/api/v1/${entity}?items=${itemsInt}&page=${pageInt + 1}`;
  const previousUrl = `/api/v1/${entity}?items=${itemsInt}&page=${pageInt - 1}`;
  const HATEOAS = {
    next: nextUrl,
    previous: previousUrl,
    total,
    results,
  };
  return HATEOAS;
};

export default prepareHateoas;
