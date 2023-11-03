function paginationHeader(page, size, count) {
    return {
        'Pagination-PageCount': Math.ceil(count / size),
        'Pagination-CurrentPage': page
    }
}

module.exports = {
    paginationHeader
}