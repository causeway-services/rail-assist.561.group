import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (name) => readFile(new URL(`../public/${name}`, import.meta.url), "utf8");
const origin = "https://north-shore-scenic-railroad-service.561.group";

test("the home page says what it is within the lengths crawlers and cards expect", async () => {
  const html = await read("index.html");
  const title = html.match(/<title>([^<]*)<\/title>/)[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  assert.ok(title.length >= 10 && title.length <= 70);
  assert.ok(description.length >= 50 && description.length <= 160, `${description.length}`);
  assert.match(html, new RegExp(`rel="canonical" href="${origin}/"`));
  assert.match(html, new RegExp(`property="og:image" content="${origin}/card.png"`));
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];
  assert.ok(ld.some((node) => node["@type"] === "WebApplication" && node.publisher.name === "Causeway Services" && node.publisher.parentOrganization.url === "https://561.group/"));
  assert.ok(ld.some((node) => node["@type"] === "Organization"));
  assert.doesNotMatch(html, /morgan|sennhauser|emsenn/i);
});

test("crawler, answer-engine and security files follow their specifications", async () => {
  const robots = await read("robots.txt");
  for (const agent of ["*", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"]) assert.match(robots, new RegExp(`User-agent: ${agent.replace("*", "\\*")}\\nAllow: /\\n`));
  assert.match(robots, new RegExp(`^Sitemap: ${origin}/sitemap.xml$`, "m"));
  assert.match(await read("sitemap.xml"), /<lastmod>\d{4}-\d\d-\d\d<\/lastmod>/);
  const llms = await read("llms.txt");
  assert.match(llms, /^# North Shore Window/);
  assert.match(llms, /unofficial/i);
  assert.match(llms, /https:\/\/play\.561\.group\//);
  assert.match(llms, /https:\/\/services\.561\.group\//);
  const security = await read(".well-known/security.txt");
  assert.match(security, /^Contact: mailto:cto@561\.group$/m);
  const expires = Date.parse(security.match(/^Expires: (\S+)$/m)[1]);
  assert.ok(expires > Date.now() && expires - Date.now() <= 366 * 24 * 3600 * 1000);
});

test("headers keep the engine's policy and add HSTS without includeSubDomains", async () => {
  const headers = await read("_headers");
  assert.match(headers, /Strict-Transport-Security: max-age=63072000\n/);
  assert.doesNotMatch(headers, /includeSubDomains/);
  assert.match(headers, /Content-Security-Policy: .*frame-ancestors 'none'/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /geolocation=\(self\)/);
});
