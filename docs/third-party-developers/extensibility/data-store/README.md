# Data Store

This document provides an overview of the data stores registered with `wp.data` for use by various blocks. Store keys are exported as constants on the `wc.wcBlocksData` export (externally registered as `@woocommerce/block-data` and enqueued via handle `wc-blocks-data-store`). For any block using the store, it's recommended to import the store key rather than using the reference directly to ensure dependencies are extracted correctly. It is assumed readers have some familiarity with the `wp.data` API. You can read more about that [here](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/).

The **[Cart Store (wc/store/cart)](cart.md)** is responsible for handling cart-related data and operations. The primary key for this store is CART_STORE_KEY.

The **[Checkout Store (wc/store/checkout)](checkout.md)** manages the checkout process, ensuring a seamless experience for users. The primary key for this store is CHECKOUT_STORE_KEY.

The **[Collections Store (wc/store/collections)](collections.md)** holds data indexed by namespace, model name, and query string. The primary key for this store is COLLECTIONS_STORE_KEY.

The **[Payment Store (wc/store/payment)](payment.md)** deals with all payment-related data and transactions. The primary key for this store is PAYMENT_STORE_KEY.

The **[Query-State Store (wc/store/query-state)](query-state.md)** holds arbitrary values indexed by context and key. It's often used for tracking the state of query objects for a given context. The primary key for this store is QUERY_STATE_STORE_KEY.

The **[Schema Store (wc/store/schema)](schema.md)** is primarily used for accessing routes and has more of an internal usage. The primary key for this store is SCHEMA_STORE_KEY.

The **[Store-Notices Store (wc/store/store-notices)](store-notices.md)** is dedicated to handling various store notices and alerts. The primary key for this store is STORE_NOTICES_STORE_KEY.

The **[Validation Store (wc/store/validation)](validation.md)** ensures data validation across the platform, ensuring data integrity and security. The primary key for this store is VALIDATION_STORE_KEY.

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/data-store/README.md)

<!-- /FEEDBACK -->
