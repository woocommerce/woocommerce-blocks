# 📣 Announcement: New documentation location

The documentation for WooCommerce Blocks has moved to the [WooCommerce monorepo](https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce-blocks/docs/).

Please refer to the documentation in the new location as the files in this repository will no longer be updated and the repository will be archived.

---

# Taxes <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Setup](#setup)
- [What to test](#what-to-test)
    - [With taxes disabled](#with-taxes-disabled)
    - [With taxes enabled](#with-taxes-enabled)

## Setup

-   You will need to have taxes setup for a region.

## What to test

### With taxes disabled

-   [ ] You should not see "Taxes" line in the cart or checkout.

### With taxes enabled

-   [ ] You should see "Taxes" line in the cart or checkout.
-   [ ] If the user address or store settings country doesn't have taxes in it, the value will be 0.

[![Create Todo list](https://raw.githubusercontent.com/senadir/todo-my-markdown/master/public/github-button.svg?sanitize=true)](https://git-todo.netlify.app/create)
