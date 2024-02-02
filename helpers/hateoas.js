

const HATEOAS = async (entity, data) => {
  const result = data.map((item) => {
    return {
      name: item.nombre,
      href: `http://localhost:3000/joyas/${entity}/${item.id}`,
    };
  });

  const totalJoyas = data.length;

  const dataWhitHateoas = {
    totalJoyas,
    result,
  };
  return dataWhitHateoas;
};
export default HATEOAS;
