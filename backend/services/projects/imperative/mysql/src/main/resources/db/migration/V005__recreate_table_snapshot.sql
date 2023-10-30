DROP TABLE IF EXISTS snapshot;

CREATE TABLE snapshot
(
    id                      BINARY(16)      NOT NULL PRIMARY KEY,
    branch_id               BINARY(16)      NOT NULL,
    data                    VARCHAR(500)    NOT NULL,
    comment                 VARCHAR(500),
    created_by              VARCHAR(255)    NOT NULL,
    created_at              DATETIME        NOT NULL,

    FOREIGN KEY (branch_id) REFERENCES branch (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = UTF8MB4;

CREATE INDEX ix_branch_created_at ON snapshot (branch_id, created_at);