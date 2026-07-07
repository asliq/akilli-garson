# Internal Reports & Audit Artifacts

Repository maintenance, branding reviews, and machine-generated QA outputs.

## Written reports

| Document | Content |
|----------|---------|
| [CONTENT_WORDING_AUDIT.md](./CONTENT_WORDING_AUDIT.md) | RC2 neutral product wording pass |
| [REPOSITORY_PROFESSIONALIZATION_REPORT.md](./REPOSITORY_PROFESSIONALIZATION_REPORT.md) | RC2 repository quality assessment |
| [REPOSITORY_CLEANUP_REPORT.md](./REPOSITORY_CLEANUP_REPORT.md) | Prior repo cleanup results |
| [REPOSITORY_CLEANUP_PLAN.md](./REPOSITORY_CLEANUP_PLAN.md) | Cleanup plan (completed) |
| [BRANDING_AUDIT_REPORT.md](./BRANDING_AUDIT_REPORT.md) | Branding consistency audit |
| [DOCUMENTATION_REVIEW.md](./DOCUMENTATION_REVIEW.md) | Documentation language review |

## Generated artifacts (JSON)

Produced by `scripts/verify-*.mjs` and `scripts/rc*-*.mjs`. Safe to regenerate; not required for running the app.

| File | Producer |
|------|----------|
| `rc2-final-release-audit-results.json` | `scripts/rc2-final-release-audit.mjs` |
| `rc1-runtime-debug-results.json` | `scripts/rc1-runtime-debug.mjs` |
| `rc1-audit-results.json` | archived audit script |
| `rc1-runtime-edge-results.json` | archived edge-case script |
| `live-page-verification.json` | page verification run |
