ALTER TABLE project ADD COLUMN default_branch_id BINARY(16) DEFAULT NULL AFTER comment;
ALTER TABLE project ADD FOREIGN KEY (default_branch_id) REFERENCES branch (id) ON DELETE CASCADE;

CREATE INDEX ix_name ON project (name);