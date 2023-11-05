function paginationHeader(page, size, count) {
    return {
        'Pagination-PageCount': Math.ceil(count / size),
        'Pagination-CurrentPage': page
    }
}

function missingFields(object, fields) {
    return fields.reduce((acc, key) => ({
        ...acc,
        ...(!object[key] && { [key]: `Field '${key}' is mandatory` })
    }), {})
}

module.exports = {
    paginationHeader,
    missingFields
}