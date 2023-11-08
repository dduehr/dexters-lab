const uuid = require('uuid')
const app = require('../app')
const config = require('../configuration')
const http = require('./http')
const db = require('./db')

app.get('/api/branches/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await findBranchById(id)
        res.status(branch ? 200 : 404).json(branch)
    } catch ({ code }) {
        res.problem(500, code)
    }
});

app.get('/api/branches/by-project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [page, size] = [req.query.page || 0, req.query.size || config.defaultPageSize]
        const [response, count] = await findBranchesByProjectId(id, page, size)
        res.set(http.paginationHeader(page, size, count)).json(response)
    } catch ({ code }) {
        res.problem(500, code)
    }
});

async function findBranchById(id) {
    const branch = await db.get(`SELECT b.id, b.name, p.default_branch_id AS project_default_branch_id
        FROM branch b, project p WHERE b.id = ? AND b.project_id = p.id`, id)

    return branch ? toDto(branch) : null
}

async function findBranchesByProjectId(id, page, size) {
    const { count } = await db.get('SELECT COUNT(1) AS count FROM branch WHERE project_id = ?', id)

    const branches = await db.all(`SELECT b.id, b.name, p.default_branch_id AS project_default_branch_id
        FROM branch b, project p WHERE b.project_id = ? AND b.project_id = p.id ORDER BY b.name LIMIT ?, ?`,
        id, page * size, size)

    return [branches.map(toDto), count];
}

function toDto(branch) {
    const dto = { ...branch, default_branch: branch.id === branch.project_default_branch_id }
    delete dto.project_default_branch_id
    return dto
}