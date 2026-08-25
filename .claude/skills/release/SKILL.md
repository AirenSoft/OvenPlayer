---
name: release
description: Release ovenplayer to npm — confirm the version, verify the committed dist/ bundle is current, write the release notes, and create the GitHub Release that triggers the npm publish.
---

Release `ovenplayer` to npm.

The publish itself runs in CI: creating the GitHub Release fires
[.github/workflows/publish.yml](.github/workflows/publish.yml), which builds and
publishes through npm trusted publishing (OIDC). This skill covers everything up
to that point. Nothing reaches npm until the release is created, so the release
creation is the point of no return — get explicit confirmation there.

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

## 6. Create the release

- State plainly that this publishes to npm and that a published version cannot
  be unpublished or replaced. Get an explicit yes.
- `gh release create v<version> --target master --title "v<version>" --notes-file <file>`
  (the tag must be `v<version>` — CI checks it against `package.json`).
- Watch the result: `gh run list --workflow=publish.yml --limit 1`, then
  `gh run watch <id>`, and confirm with `npm view ovenplayer version`.
- If the run fails before the publish step, fix the cause and re-run the
  workflow. If the version already landed on npm, do not attempt to republish
  it — the next release needs a new version.
