# rail-assist.561.group

<!-- 561-group-standards:badges:start -->
[![Causeway Services](https://img.shields.io/badge/561%20Group-Causeway%20Services-115e69)](https://github.com/causeway-services)
[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-115e69)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/causeway-services/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

Thin Cloudflare Worker deployment carrier for the North Shore rail-ride
assistant. All behavior lives in `@causeway-services/north-shore-scenic-railroad-service`;
this directory owns only provider configuration and the one-line application
composition.

`scripts/sync-public.mjs` materializes the service-owned browser artifacts into
the ignored `public/` deployment overlay. It then uses the shared PWA projector
to derive `manifest.webmanifest` and a byte-revisioned service worker, with a
selective precache that includes every browser module and the Worker-owned
`/api/route` bootstrap. The existing HTML manifest discovery and client-side
service-worker registration remain unchanged.

The same step creates `release-manifest.json`, verifies the materialized files
against it, and runs local static-link conformance. `_headers` and the manifest
itself are declared exclusions; `/api/route` and `/healthz` remain explicit
runtime routes rather than static artifacts. Both `npm test` and the
automatic `predeploy` fail before Wrangler runs if these checks fail.

The directory-bound Wrangler profile is still selected by the authentication
service. Provider authority and deployment remain the ordinary `wrangler
deploy`; this package does not perform post-deploy traffic checks.
