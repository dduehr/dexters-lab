const uuid = require('uuid')
const app = require('../app')
const config = require('../configuration')
const http = require('./http')
const object = require('./object')
const db = require('./db')

app.post('/snapshots', async (req, res) => {
    const missingFields = http.missingFields(req.body, ['branchId', 'data'])
    if (!object.isEmpty(missingFields)) {
        res.problem(400, 'BAD_REQUEST', missingFields)
    } else {
        try {
            const response = await createSnapshot(req.body)
            res.json(response)
        } catch ({ code }) {
            res.problem(500, code)
        }
    }
})

app.post('/snapshots/new-branch', async (req, res) => {
    const missingFields = http.missingFields(req.body, ['projectId', 'branchName', 'data'])
    if (!object.isEmpty(missingFields)) {
        res.problem(400, 'BAD_REQUEST', missingFields)
    } else {
        try {
            await db.run('BEGIN')
            const response = await createSnapshotWithBranch(req.body)
            await db.run('COMMIT')
            res.json(response)
        } catch ({ code }) {
            await db.run('ROLLBACK')
            switch (code) {
                case 'APP_PROJECT_NOT_FOUND':
                    res.problem(400, code, {
                        projectId: `A project with the ID '${req.body.projectId}' was not found`
                    })
                    break
                case 'SQLITE_CONSTRAINT':
                    res.problem(409, code, {
                        branchName: `A branch with the name '${req.body.branchName}' already exists for this project`
                    })
                    break
                default:
                    res.problem(500, code)
            }
        }
    }
})

app.get('/snapshots/:id', async (req, res) => {
    try {
        const { id } = req.params
        const snapshot = await findSnapshotById(id)
        res.status(snapshot ? 200 : 404).json(snapshot)
    } catch ({ code }) {
        res.problem(500, code)
    }
})

app.get('/snapshots/by-branch/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [page, size] = [req.query.page || 0, req.query.size || config.defaultPageSize]
        const [response, count] = await findSnapshotsByBranchId(id, page, size)
        res.set(http.paginationHeader(page, size, count)).json(response)
    } catch ({ code }) {
        res.problem(500, code)
    }
})

app.get('/snapshots/by-project/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [page, size] = [req.query.page || 0, req.query.size || config.defaultPageSize]
        const [response, count] = await findSnapshotsByProjectId(id, page, size)
        res.set(http.paginationHeader(page, size, count)).json(response)
    } catch ({ code }) {
        res.problem(500, code)
    }
})

async function createSnapshot(dto) {
    const snapshot = { ...dto, id: uuid.v4(), createdBy: '<unknown>', createdAt: new Date().toISOString() }

    await db.run('INSERT INTO snapshot (id, branch_id, data, comment, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        snapshot.id, snapshot.branchId, snapshot.data, snapshot.comment, snapshot.createdBy, snapshot.createdAt)

    return findSnapshotById(snapshot.id)
}

async function createSnapshotWithBranch(dto) {
    const { projectId, branchName, data, comment } = dto

    const project = await db.get('SELECT * FROM project WHERE id = ?', projectId)

    if (!project) {
        throw { code: 'APP_PROJECT_NOT_FOUND' }
    }

    const branch = {
        id: uuid.v4(), projectId: projectId, name: branchName
    }

    await db.run('INSERT INTO branch (id, project_id, name) VALUES (?, ?, ?)',
        branch.id, branch.projectId, branch.name)

    if (!project.default_branch_id) {
        project.default_branch_id = branch.id
        await db.run('UPDATE project SET default_branch_id = ? WHERE id = ?',
            project.default_branch_id, projectId)
    }

    const snapshot = {
        id: uuid.v4(), branchId: branch.id, data: data, comment: comment,
        createdBy: '<unknown>', createdAt: new Date().toISOString()
    }

    await db.run('INSERT INTO snapshot (id, branch_id, data, comment, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        snapshot.id, snapshot.branchId, snapshot.data, snapshot.comment, snapshot.createdBy, snapshot.createdAt)

    return findSnapshotById(snapshot.id)
}

async function findSnapshotById(id) {
    const snapshot = await db.get(`SELECT s.id, b.id as branch_id,
        b.name as branch_name, p.default_branch_id as project_default_branch_id,
        s.data, s.comment, s.created_by as createdBy, s.created_at as createdAt
        FROM snapshot s, branch b, project p
        WHERE s.id = ? AND s.branch_id = b.id AND b.project_id = p.id`, id)

    return snapshot ? toDto(snapshot) : null
}

async function findSnapshotsByBranchId(id, page, size) {
    const { count } = await db.get('SELECT COUNT(1) AS count FROM snapshot WHERE branch_id = ?', id)

    const snapshots = await db.all(`SELECT s.id, b.id as branch_id,
        b.name as branch_name, p.default_branch_id as project_default_branch_id,
        s.data, s.comment, s.created_by as createdBy, s.created_at as createdAt
        FROM snapshot s, branch b, project p
        WHERE s.branch_id = ? AND s.branch_id = b.id AND b.project_id = p.id
        ORDER BY s.created_at DESC LIMIT ?, ?`, id, page * size, size)

    return [snapshots.map(toDto), count]
}

async function findSnapshotsByProjectId(id, page, size) {
    const { count } = await db.get('SELECT COUNT(1) AS count FROM snapshot s, branch b WHERE s.branch_id = b.id AND b.project_id = ?', id)

    const snapshots = await db.all(`SELECT s.id, b.id as branch_id,
        b.name as branch_name, p.default_branch_id as project_default_branch_id,
        s.data, s.comment, s.created_by as createdBy, s.created_at as createdAt
        FROM snapshot s, branch b, project p
        WHERE s.branch_id = b.id AND b.project_id = p.id AND p.id = ?
        ORDER BY s.created_at DESC LIMIT ?, ?`, id, page * size, size)

    return [snapshots.map(toDto), count]
}

function toDto(snapshot) {
    const dto = {
        ...snapshot,
        branch: {
            id: snapshot.branch_id,
            name: snapshot.branch_name,
            default_branch: snapshot.branch_id === snapshot.project_default_branch_id
        }
    }
    delete dto.branch_id
    delete dto.branch_name
    delete dto.project_default_branch_id
    return dto
}