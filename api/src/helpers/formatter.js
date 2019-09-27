const formatter = (data, type) => {
  if (!data) return {};
  const obj = {
    type,
    id: data.id,
    attributes: data,
    links: {
      self: `/api/v1/users/${data.id}`
    }
  };
  return obj;
};

module.exports = formatter;
