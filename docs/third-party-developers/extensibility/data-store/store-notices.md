# Store-Notices Store <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

-   [Overview](#overview)
-   [Usage](#usage)
-   [Actions](#actions)
    -   [registerContainer](#registercontainer)
    -   [unregisterContainer](#unregistercontainer)
-   [Selectors](#selectors)
    -   [getRegisteredContainers](#getregisteredcontainers)
        -   [_Returns_](#returns)
        -   [_Example_](#example)

## Overview

The Store-Notices Store manages the registration and tracking of notice containers within WooCommerce Blocks. By utilizing this store, developers can easily register or unregister containers, ensuring a seamless integration of notices.

## Usage

To utilize this store you will import the `STORE_NOTICES_STORE_KEY` in any module referencing it. Assuming `@woocommerce/block-data` is registered as an external pointing to `wc.wcBlocksData` you can import the key via:

```js
import { STORE_NOTICES_STORE_KEY } from '@woocommerce/block-data';
```

## Actions

### registerContainer( containerContext )

This action will register a new container.

#### _Parameters_ <!-- omit in toc -->

-   _containerContext_ `string`: The context or identifier of the container to be registered.

#### _Returns_ <!-- omit in toc -->

-   `object`: An action object with the following properties:
    -   _type_ `string`: The type of the action.
    -   _containerContext_ `string`: The passed _containerContext_.

#### _Example_ <!-- omit in toc -->

```javascript
dispatch( registerContainer( 'someContainerContext' ) );
```

### unregisterContainer( containerContext )

This action will unregister an existing container.

#### _Parameters_ <!-- omit in toc -->

-   _containerContext_ `string`: The context or identifier of the container to be unregistered.

#### _Returns_ <!-- omit in toc -->

-   `object`: An action object with the following properties:
    -   _type_ `string`: The type of the action.
    -   _containerContext_ `string`: The passed _containerContext_.

#### _Example_ <!-- omit in toc -->

```js
dispatch( unregisterContainer( 'someContainerContext' ) );
```

## Selectors

### getRegisteredContainers

Returns the list of currently registered containers from the state.

#### _Returns_

-   `string[]`: An array of strings with the registered container contexts.

#### _Example_

```js
const store = select( 'wc/store/store-notices' );
const registeredContainers = store.getRegisteredContainers();
```

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/third-party-developers/extensibility/data-store/validation.md)

<!-- /FEEDBACK -->
