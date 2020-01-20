# Releases

## Prerequisites - what you need to release WooCommerce Blocks
- Install & set up [GitHub hub](https://hub.github.com) tools.
- Configure a GitHub token for release scripts to use.
  - https://github.com/settings/tokens
  - Select the following permissions: 
    - `admin:org`
    - `public_repo`
    - `read:user`
  - Ensure your token is available to scripts, e.g. `export GH_API_TOKEN={token}` or similar.
- Get WPORG plugin svn commit access - ask a team member.

_Outcome_: __You are equipped to ship a release!__

## Release process
### Lead-up to release
#### Ensure release development is complete
- Ensure all issues/PRs intended for this release are merged & closed and assigned to release milestone.
- All PRs should have changelog entry, or `skip-changelog` tag.
- Check with team to confirm any outstanding or in progress work.

Note: changelog should be formatted like this in PR description. Note the preceding `> ` - this is required by changelog script.

```md
### Changelog

> bug: Fix bug in Safari and other Webkit browsers that was causing the All Products block to show 0 results when resetting the sort value.
```

_Outcome_: __Team is aware of release and in agreement about what fixes & features are included.__

#### Ensure release branch includes all relevant fixes
- Make release branch if needed (major/minor). (?)
- Update your local checkout to tip of the release branch.
- Cherry pick all PRs into the release branch:
  - If branch is already labelled `status: cherry-picked 🍒` then continue to next PR.
  - Ideally, use GitHub Hub to cherry pick the PR - `hub am -3 {http://URL-TO-PR}`. 
  - If there are serious conflicts or extensive differences between `master` and release branch, you may need to take more care:
    - Manually cherry pick individual commits using git - `git cherry-pick {COMMIT-HASH}`.
    - Or in some cases, manually craft a new PR with appropriate changes, targeting release branch.
  - Push the release branch to origin (so changes are in GitHub repo).
  - Label the PR: `status: cherry-picked 🍒`.

_Outcome_: __Release branch has all relevant changes merged & pushed.__

### Prepare release
#### Ensure release branch readme is up to date
- Run changelog script `npm run changelog` to get changelog txt for readme. Changelog content will be output to screen by script.
- Add changelog section for release, e.g. `= 2.5.11 - 2020-01-20 =`.
- Copy-paste the changelog content into `readme.txt`.
- Make any other changes to readme as needed - e.g. support versions changing, new blocks.

_Outcome_: __`readme.txt` is up to date with changes for release.__

#### Build zip & smoke test
- Ensure you are on tip of release branch.
- Update dependencies – `npm ci`.
- Run a production build - `npm run build`.
- Run package script to get a zip to test `npm run package-plugin`.
- Smoke test built release zip:
  - Recommend doing this in a clean environment, e.g. Jurassic.Ninja site.
  - Sanity check - check correct blocks exist and function.
  - Test to confirm new features/fixes are working correctly.
  - Smoke test – test a cross section of core functionality.

_Outcome_: __Confident that source code is ready for release: intended fixes are working correctly, no release blockers or build issues.__

### Release!
#### Release to GitHub
- Prepare tagged release on github `npm run deploy`. 
  - Note: the script automatically updates version numbers (commits on your behalf).
- Edit release, add changelog info to Github release notes.
- Check release repo tag is correct - checkout, smoke test/sanity check.

_Outcomes_: __Version numbers updated in source code & developers can test tagged release.__

###### Release to WPORG
- Push release to WPORG `npm run release`.
- Note that this may happen a day or so after Github release.

_Outcome_: __Customers can install/update via WPORG & WPORG plugin page up to date__.

### After release
#### Update `master` with release changes
- Ensure changelog is up to date on master.
- If major/minor release, update version on master.
- Code changes should already be present on master (all dev happens on `master`).


## Details to link / document
- Release milestones
- Release branches
- Relationship to Woo core release
- Testing blocks when included in Woo core 
- Policy for inclusion in major / minor / fix releases
