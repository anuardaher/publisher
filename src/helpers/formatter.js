const formatter = (data, type) => {
    if (!data) return;
    console.log(data, type);
    return {
        type: type,
        id: data.id,
        attributes: data,
        links: {
            self: `/api/v1/users/${data.id}`
        }
    }
}

module.exports = formatter;