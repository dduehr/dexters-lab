CREATE TABLE IF NOT EXISTS snapshot
(
    id                      BINARY(16)      NOT NULL PRIMARY KEY,
    project_id              BINARY(16)      NOT NULL,
    data                    VARCHAR(500)    NOT NULL,
    comment                 VARCHAR(500),
    created_by              VARCHAR(80)     NOT NULL,
    created_at              DATETIME        NOT NULL,

    FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = UTF8MB4;