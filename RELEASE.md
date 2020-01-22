# Releases

This document outlines the process of releasing new versions of the blocks plugin.

## Prerequisites - what you need to release WooCommerce Blocks
- You should be set up for development - for more info see [`CONTRIBUTING.md`](CONTRIBUTING.md).
- Install & set up [GitHub hub](https://hub.github.com) tools.
- Configure a GitHub token for release scripts to use.
  - https://github.com/settings/tokens
  - Select the following permissions: 
    - `admin:org`
    - `public_repo`
    - `read:user`
  - Ensure your token is available to scripts, e.g. `export GH_API_TOKEN={YOUR-TOKEN}` or similar.
- Get WPORG plugin svn commit access - ask a team member.

_Outcome_: __You are equipped to ship a release!__

## Release process
### Lead-up to release
#### Ensure release development is complete
- Release milestone should exist (!).
- Ensure all issues/PRs intended for this release are merged, closed and assigned to release milestone.
- All PRs should have changelog entry, or `skip-changelog` tag.
- Check with the team to confirm any outstanding or in progress work.

Note: changelog should be formatted like this in PR description. Note the preceding `> ` - this is required by changelog script.

```md
### Changelog

> bug: Fix bug in Safari and other Webkit browsers that was causing the All Products block to show 0 results when resetting the sort value.
```

_Outcome_: __Team is aware of release and in agreement about what fixes & features are included.__

#### Ensure release branch includes all relevant fixes
- Make release branch if needed (major/minor).
  - For fix releases, the branch should already exist.
  - Otherwise create branch: `release/X.X`.
- Update your local checkout to the tip of the release branch.
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
- Add changelog section for release, e.g. [`= 2.5.11 - 2020-01-20 =`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/commit/74a41881bfa456a2167a52aaeb4871352255e328).
- Copy-paste the changelog content into `readme.txt`.
- Make any other changes to readme as needed - e.g. support versions changing, new blocks. 
- Push readme changes to release branch on origin repo.

_Outcome_: __`readme.txt` is up to date with changes for release.__

#### Build zip & smoke test
- Ensure you are on the tip of the release branch, e.g. `git pull origin release/2.5`
- Update dependencies – `npm ci`.
- Run a production build - `npm run build`.
- Run package script to get a zip to test `npm run package-plugin`.
- Smoke test built release zip:
  - __Recommended__: 
    - At least one other person should test the built zip - ask a teammate to help out.
    - Test a clean environment, e.g. Jurassic.Ninja site.
  - Confidence check - check correct blocks exist and function.
  - Test to confirm new features/fixes are working correctly.
  - Smoke test – test a cross section of core functionality.

_Outcome_: __Confident that source code is ready for release: intended fixes are working correctly, no release blockers or build issues.__

### Release!
#### Release to GitHub
- Prepare tagged release on github `npm run deploy`. 
  - Note: the script automatically updates version numbers (commits on your behalf).
- Edit release, add changelog info to Github release notes.
- Check release repo tag is correct - checkout, smoke test/confidence check.

_Outcomes_: __Version numbers updated in source code & developers can test tagged release.__

#### Release to WPORG
- Push release to WPORG `npm run release`.
- Note that this may happen a day or so after Github release.

_Outcome_: __Customers can install/update via WPORG; WPORG plugin page is up to date__.

### After release
#### Update `master` with release changes
- Ensure changelog is up to date on master.
- If major/minor release, update version on master with dev suffix, e.g. [`2.6-dev`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/commit/e27f053e7be0bf7c1d376f5bdb9d9999190ce158).
- Code changes should already be present on master - all dev happens on `master`.

## Appendix: updating a specific file on WPORG 

Sometimes, we need to update a single file in WordPress.org without wanting to do a full release, for example, updating the `readme.txt` versions or descriptions. In order to do that, refer to the _[Editing Existing Files](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/#editing-existing-files)_ section of the Subversion guide in developer.wordpress.org or follow these steps:

1. Checkout the plugin repo:

```
svn co "http://plugins.svn.wordpress.org/woo-gutenberg-products-block/"
cd woo-gutenberg-products-block
```

2. Modify the files you want to change in `trunk` or `tags/x.y.z`.

3. Check your changes with:

```
svn stat
svn diff
```

4. Commit the changes to the server:

```
svn ci -m "Updated readme.txt description"

## `@todo` Missing info to link to / document
- Release milestones
- Relationship to Woo core release
- Testing blocks plugin as included in Woo core (do we do this?)
- Policy for inclusion in major / minor / fix releases - i.e. how we use versioning 
- ["Legacy"](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/add/release-process/assets/js/legacy/README.md) stuff - is this relevant to releases?
- `jetpack-autoloader` versions in this plugin vs. wc-admin vs. WooCommerce core
