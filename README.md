# rail-assist.561.group

<!-- 561-group-standards:badges:start -->
[![Causeway Services](https://img.shields.io/badge/561%20Group-Causeway%20Services-115e69)](https://github.com/causeway-services)
[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-115e69)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/causeway-services/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->


Public data of the North Shore Window rail-ride assistant deployment (https://north-shore-scenic-railroad-service.561.group/): `content/deployment/cloudflare-authentication-request.json`, the provider-authentication request parameters.

The executable carrier that builds `public/`, verifies the release manifest and deploys the Worker (`scripts/sync-public.mjs`, tests, `wrangler.jsonc`, `package.json`) lives in [red-cup-engineering/rail-assist-site-service](https://github.com/red-cup-engineering/rail-assist-site-service). Overlay a checkout of this repository on that one to authenticate, test and deploy.
