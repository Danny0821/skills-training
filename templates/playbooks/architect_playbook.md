# playbook.md — {{NAME}} Playbook

> [!NOTE]
> Architect & design schema deep technical knowledge base. Solutions, schemas, and workarounds.
> Link back to lessons_index.md using tag anchors.

---

## [SCHEMA_01] Foreign Key constraints violation on Greenfield bootstrap
- **Issue**: Database schema fails to execute due to wrong table creation order.
- **Cause**: Tables containing Foreign Keys are created before the referenced primary tables.
- **Fix**: Order DDL scripts topologically. Ensure independent tables (e.g., users) are scaffolded first.
- **Code Workaround**:
  ```sql
  -- Create independent tables first
  CREATE TABLE users (
      id INT PRIMARY KEY,
      name VARCHAR(100)
  );

  -- Create dependent tables last
  CREATE TABLE orders (
      id INT PRIMARY KEY,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
  );
  ```

---

## [WIREFRAME_01] Responsive layout design specifications missing
- **Issue**: Wireframe documentation is rejected due to lack of responsive specifications.
- **Cause**: Designing static, fixed-width coordinate models.
- **Fix**: Specify flexible grid parameters, mobile break points, and container margins in architecture specs.
- **Code Workaround**:
  ```markdown
  ### Responsive Layout Parameters
  - Breakpoints: Desktop (1440px), Tablet (768px), Mobile (375px)
  - Grids: 12-column Desktop (24px gutter), 4-column Mobile (16px gutter)
  - Layout behavior: Fluid containers with fixed margins on mobile viewports.
  ```

---

## [JSON_SCHEMA_01] Draft-07 format compliance failure
- **Issue**: API integration payloads fail schema validator check.
- **Cause**: JSON schema specification uses obsolete Draft formats or has structural mismatches.
- **Fix**: Target standard Draft-07 syntax, explicitly declare `$schema` version, and specify `additionalProperties: false`.
- **Code Workaround**:
  ```json
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "email": { "type": "string", "format": "email" }
    },
    "required": ["id", "email"],
    "additionalProperties": false
  }
  ```
