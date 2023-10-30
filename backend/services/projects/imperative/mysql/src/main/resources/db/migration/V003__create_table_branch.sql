CREATE TABLE IF NOT EXISTS branch
(
    id                      BINARY(16)      NOT NULL PRIMARY KEY,
    project_id              BINARY(16)      NOT NULL,
    name                    VARCHAR(255)    NOT NULL,

    CONSTRAINT uc_project_branch_name UNIQUE (project_id, name),
    FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = UTF8MB4;

CREATE INDEX ix_project_branch_name ON branch (project_id, name);