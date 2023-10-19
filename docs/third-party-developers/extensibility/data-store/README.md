# Data Store

This document provides an overview of the data stores registered with `wp.data` for use by various blocks. Store keys are exported as constants on the `wc.wcBlocksData` export (externally registered as `@woocommerce/block-data` and enqueued via handle `wc-blocks-data-store`). For any block using the store, it's recommended to import the store key rather than using the reference directly to ensure dependencies are extracted correctly.

It is assumed readers have some familiarity with the `wp.data` API. You can read more about that [here](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/).

## [Cart Store (wc/store/cart)](cart.md)

The **Cart Store** is responsible for handling cart-related data and operations. The primary key for this store is CART_STORE_KEY.

## [Checkout Store (wc/store/checkout)](checkout.md)

The **Checkout Store** manages the checkout process, ensuring a seamless experience for users. The primary key for this store is CHECKOUT_STORE_KEY.

## [Collections Store (wc/store/collections)](collections.md)

The **Collections Store** holds data indexed by namespace, model name, and query string. The primary key for this store is COLLECTIONS_STORE_KEY.

## [Payment Store (wc/store/payment)](payment.md)

The **Payment Store** deals with all payment-related data and transactions. The primary key for this store is PAYMENT_STORE_KEY.

## [Query-State Store (wc/store/query-state)](query-state.md)

The **Query-State Store** holds arbitrary values indexed by context and key. It's often used for tracking the state of query objects for a given context. The primary key for this store is QUERY_STATE_STORE_KEY.

## [Schema Store (wc/store/schema)](schema.md)

The **Schema Store** is primarily used for accessing routes and has more of an internal usage. The primary key for this store is SCHEMA_STORE_KEY.

## [Store-Notices Store (wc/store/store-notices)](store-notices.md)

The **Store-Notices Store** is dedicated to handling various store notices and alerts. The primary key for this store is STORE_NOTICES_STORE_KEY.

## [Validation Store (wc/store/validation)](validation.md)

The **Validation Store** ensures data validation across the platform, ensuring data integrity and security. The primary key for this store is VALIDATION_STORE_KEY.

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/data-store/README.md)

<!-- /FEEDBACK -->

---

Organizing the data stores in paragraph format like this can make the content more readable and give readers a quick overview of each store's purpose without having to navigate away from the page.
