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
- For _major_ and _minor_ releases, we use ZenHub.
- For _patch_ releases, we use GitHub milestones - [example](https://github.com/woocommerce/woocommerce-gutenberg-products-block/milestone/41).
- Ensure all issues/PRs intended for this release are merged, closed and linked to release.
- All PRs should have changelog entry, or `skip-changelog` tag.
- Check with the team to confirm any outstanding or in progress work.

Note: changelog should be formatted like this in PR description. Note the preceding `> ` - this is required by changelog script.

```md
### Changelog

> bug: Fix bug in Safari and other Webkit browsers that was causing the All Products block to show 0 results when resetting the sort value.
```

_Outcome_: __Team is aware of release and in agreement about what fixes & features are included.__

#### Ensure release branch includes all relevant fixes
- Make release branch if needed.
  - For _major_ and _minor_ releases, create branch: `release/X.X`.
  - For _patch_ releases, the branch should already exist.
- Update your local checkout to the tip of the release branch.
- For _patch_ releases, cherry pick relevant PRs into the release branch:
  - If PR is already labelled `status: cherry-picked 🍒` then continue to next PR.
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

_Outcome_: __Release branch has `readme.txt` is updated with release details.__

#### Build zip & smoke test
- Ensure you are on the tip of the release branch, e.g. `git pull origin release/2.5`
- Update dependencies – `npm ci`.
- Run a production build - `npm run build`.
- Run package script to get a zip to test `npm run package-plugin`.
- Smoke test built release zip:
  - __Recommended__: 
    - At least one other person should test the built zip - ask a teammate to help out.
    - Test in a clean environment, e.g. Jurassic.Ninja site.
  - Confidence check - check blocks are available and function.
  - Test to confirm new features/fixes are working correctly.
  - Smoke test – test a cross section of core functionality.

_Outcome_: __Confident that source code is ready for release: intended fixes are working correctly, no release blockers or build issues.__

### Release!
#### Tag release on GitHub
- Prepare tagged release on github `npm run deploy`. 
  - Note: the script automatically updates version numbers (commits on your behalf).
- Edit release, add changelog info to Github release notes.
- Check release repo tag is correct - checkout, smoke test/confidence check.

_Outcomes_: __Version numbers updated in source code & developers can test tagged release.__

#### Release to WPORG
- Run `npm run release`. This script clones a copy of the source code to your home folder, and outputs an `svn` command to push release up to WPORG.
- Push release to WPORG using `svn`.
  - Run generated svn command to commit to WPORG svn repo.
    - The command should look like this: `cd /Users/{YOU}/blocks-deployment/woo-gutenberg-products-block-svn && svn ci -m "Release 2.5.11, see readme.txt for changelog."`
  - Commit should complete successfully with a message like `Committed revision 2231217.`.
- Confirm that the WPORG release is updated and correct:
  - Changelog, `Version` & `Last updated` on https://wordpress.org/plugins/woo-gutenberg-products-block/
  - Confirm svn tag is correct, e.g. [2.5.11](https://plugins.svn.wordpress.org/woo-gutenberg-products-block/tags/2.5.11/)
  - Confirm WooCommerce.com plugin page is updated https://woocommerce.com/products/woocommerce-gutenberg-products-block/
  - Download zip and smoke test.
  - Test updating plugin from previous version.
    - Recommended: test existing WooCommerce Blocks content works correctly after update (no block validation errors).

_Outcome_: __Customers can install/update via WPORG; WPORG plugin page is up to date__.

### After release
#### Update `master` with release changes
- Ensure changelog is up to date on master.
- For _major_ & _minor_ releases, update version on master with dev suffix, e.g. [`2.6-dev`](https://github.com/woocommerce/woocommerce-gutenberg-products-block/commit/e27f053e7be0bf7c1d376f5bdb9d9999190ce158).
- Code changes should already be present on master - all dev happens on `master`.

#### Clean up release milestone / Zenhub
- For _patch_ releases, close the milestone in GitHub.
- For _major_ & _minor_ releases - tbc

## Appendix: Versions
We have _major_, _minor_ and _patch_ releases. 

For example:

- version == 2.5.11 is a _patch_ release
  - 2 == _major_ version; has breaking changes or major new features
  - 5 == _minor_ version; has new features
  - 11 == _patch_, aka point / revision / fix; has bug fixes and improvements to existing features
- 2.6 is a _minor_ release
- 3.0 is a _major_ release

There are some differences to our release process for each kind of release - these are detailed in the steps above.

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
