---
name: release
description: Release ovenplayer to npm — confirm the version, verify the committed dist/ bundle is current, write the release notes, and open a draft GitHub Release for the user to publish.
---

Release `ovenplayer` to npm.

The publish itself runs in CI: publishing the GitHub Release fires
[.github/workflows/publish.yml](.github/workflows/publish.yml), which builds and
publishes through npm trusted publishing (OIDC). This skill stops at a draft
release. Nothing reaches npm until that draft is published, and publishing it is
the user's call — see step 6.

## 1. Preflight

- `git status --short` and `git log --oneline -10`. Work from `master`, with a
  clean tree, synced with origin (`git fetch && git status -sb`). Surface
  anything unexpected — stray modified files, unpushed commits — and ask how to
  proceed before continuing.
- Establish the baseline with `gh release list --limit 3` and
  `npm view ovenplayer version`. Do not use `git describe` for this: some tags in
  this repo do not sit on `master`, so it reports the wrong baseline.

## 2. Confirm the version

- This repo bumps `package.json` inside the feature commit rather than in a
  separate release commit, so the version is often already ahead of npm. Compare
  `package.json` against the published version first — a bump may not be needed.
- List the commits since the last release, group them into features / fixes /
  chores, and propose the version from that.
- Show the published version, the version in `package.json`, the proposal, and
  the commit list. Ask the user to confirm. Never pick the version silently.

## 3. Verify dist/ is final

`dist/` is committed to the repo and served to jsdelivr consumers, and webpack
inlines the `package.json` version into the bundle as `__VERSION__`
([webpack.config.js:86](webpack.config.js#L86)). A version bump therefore
invalidates the committed bundle.

- Run `npm run build`, then `git status --short dist/`.
  - Clean → the committed bundle matches `src/` at this version. Say so.
  - Dirty → the committed bundle was stale. Commit the rebuild before tagging
    (`chore: rebuild the bundle`, or folded into the version-bump commit).
- Confirm the version embedded in the bundle is the version being released:
  `grep -o '0\.[0-9]*\.[0-9]*' dist/ovenplayer.js | sort -u`.

## 4. Bump, if step 2 called for one

Update the version in `package.json` and `package-lock.json`, rebuild so `dist/`
carries the new `__VERSION__`, and commit them together. Match the commit style
in `git log`. Push before tagging.

## 5. Write the release notes

- Read the previous two or three releases (`gh release view <tag>`). They are
  hand-written and feature-first: what changed for the user, with code samples
  for new options. They are not a commit dump. Match that.
- Draft from the actual diff since the last release, not from commit subjects
  alone. Show the draft and get the user's approval on it.

## 6. Create the release as a draft

Always create it as a draft, even when the user is ready to release. `publish.yml`
fires on `release: published`, so a draft publishes nothing — it is a free
checkpoint for reading the notes as GitHub renders them.

- `gh release create v<version> --draft --target master --title "v<version>" --notes-file <file>`
  (the tag must be `v<version>` — CI checks it against `package.json`).
- Give the user the draft URL and let them read it. Editing a draft triggers
  nothing, so iterate freely: `gh release edit v<version> --notes-file <file>`
  resolves by tag name even before the tag exists. The `untagged-...` URL changes
  on every edit while the release id stays the same, so hand over the new link.
- Do not publish the draft yourself unless the user explicitly asks. Publishing is
  the point of no return: say plainly that it publishes to npm and that a
  published version cannot be unpublished or replaced. Normally the user presses
  **Publish release** in the GitHub UI; on request it is
  `gh release edit v<version> --draft=false --latest`.
- The tag is created at publish time, pointing at `master` HEAD *then* — not at
  the commit that was HEAD when the draft was made. If master moved in between,
  re-check the version and `dist/`.

## 7. Watch the publish

- `gh run list --workflow=publish.yml --limit 1`, then `gh run watch <id>`, and
  confirm with `npm view ovenplayer version`.
- `404 Not Found - PUT` is an authentication failure, not a missing package.
  Check the trusted publisher config on npmjs.com first — package → Settings →
  Trusted Publisher, with repo `OvenMediaLabs/OvenPlayer`, workflow
  `publish.yml`, environment blank — before touching `publish.yml`. npm does not
  validate that config when it is saved, so a typo only surfaces here.
- Retry with `gh run rerun <id>`. The `published` event cannot be re-fired, and a
  re-run replays it with fresh OIDC tokens, so the release and tag can stay as
  they are. This only works when the fix is outside the repo: a re-run uses the
  workflow file from the tagged commit, so a change to `publish.yml` itself is
  not picked up.
- If the version already landed on npm, do not attempt to republish it — the next
  release needs a new version.
