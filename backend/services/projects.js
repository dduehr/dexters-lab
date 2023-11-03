const uuid = require('uuid')
const app = require('../app')
const config = require('../configuration')
const http = require('./http')
const db = require('./db')

app.get('/projects', async (req, res) => {
    try {
        const [page, size] = [req.query.page || 0, req.query.size || config.defaultPageSize]
        const [response, count] = await findAllProjects(page, size)
        res.set(http.paginationHeader(page, size, count)).json(response)
    } catch ({ code }) {
        res.status(500).send(code);
    }
});

app.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await findProjectById(id)
        res.status(response ? 200 : 404).json(response)
    } catch ({ code }) {
        res.status(500).send(code);
    }
});

app.post('/projects', async (req, res) => {
    try {
        const response = await createProject(req.body)
        res.json(response)
    } catch ({ code }) {
        switch (code) {
            case 'SQLITE_CONSTRAINT':
                res.status(409).send(code);
                break;
            default:
                res.status(500).send(code);
        }
    }
});

async function createProject(dto) {
    const project = { ...dto, id: uuid.v4() }

    await db.run('INSERT INTO project (id, name, comment, default_branch_id) VALUES (?, ?, ?, ?)',
        project.id, project.name, project.comment, project.default_branch_id)

    return findProjectById(project.id)
}

async function findAllProjects(page, size) {
    const { count } = await db.get('SELECT COUNT(1) AS count FROM project')

    const projects = await db.all(`SELECT p.id, p.name, p.comment, p.default_branch_id, b.name AS default_branch_name
        FROM project p LEFT JOIN branch b ON p.default_branch_id = b.id ORDER BY p.name LIMIT ?, ?`, page * size, size)

    return [projects.map(toDto), count];
}

async function findProjectById(id) {
    const project = await db.get(`SELECT p.id, p.name, p.comment, p.default_branch_id, b.name AS default_branch_name FROM project p
        LEFT JOIN branch b ON p.default_branch_id = b.id WHERE p.id = ?`, id)

    return project ? toDto(project) : null
}

function toDto(project) {
    const dto = project.default_branch_id ?
        { ...project, defaultBranch: { id: project.default_branch_id, name: project.default_branch_name } } :
        { ...project }
    delete dto.default_branch_id
    delete dto.default_branch_name
    return dto
}