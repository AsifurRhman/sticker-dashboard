export const routeLinkGenerators = (items) => {
  const links = items.reduce((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        name: item.name,
        path: item.path,
        icon: item.icon,
      });
    }
    return acc;
  }, []);
  return links;
};
