CREATE OR REPLACE VIEW project_view (id, name, comment, default_branch_id)
    AS SELECT BIN_TO_UUID(id), name, comment, BIN_TO_UUID(default_branch_id) FROM project;

CREATE OR REPLACE VIEW branch_view (id, project_id, name)
    AS SELECT BIN_TO_UUID(id), BIN_TO_UUID(project_id), name FROM branch;

CREATE OR REPLACE VIEW snapshot_view (id, branch_id, project_id, data, comment, created_by, created_at)
    AS SELECT BIN_TO_UUID(s.id), BIN_TO_UUID(s.branch_id), BIN_TO_UUID(p.id), s.data, s.comment, s.created_by, s.created_at
    FROM snapshot s, branch b, project p
    WHERE s.branch_id = b.id AND b.project_id = p.id;