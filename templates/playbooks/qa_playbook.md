# playbook.md — {{NAME}} Playbook

> [!NOTE]
> QA E2E testing, playwright/cypress, and integration tests technical knowledge base.
> Link back to lessons_index.md using tag anchors.

---

## [TEST_TIMEOUT_01] Async E2E selector timeout in headless run
- **Issue**: Playwright/Cypress E2E test runner throws timeouts in CI.
- **Cause**: CI server latency causes delayed DOM rendering under headless operations.
- **Fix**: Boost default element locator timeouts to 10s-15s instead of short static intervals, and ensure wait states are network-idle based.
- **Code Workaround**:
  ```javascript
  // Playwright timeout workaround
  await page.waitForSelector('.dashboard-grid', { timeout: 15000 });
  ```

---

## [MOCK_FIXTURE_01] API schema drifts breaking integration mock payloads
- **Issue**: Test mocks return obsolete mock payloads, hiding code defects.
- **Cause**: Hand-rolling mocks that drift away from active production schemas.
- **Fix**: Generate test fixtures directly from shared JSON schema contracts, or run integration contract tests (e.g. Pact).
