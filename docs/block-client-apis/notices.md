# useStoreNotices()

The `useStoreNotices()` hook allows reading and manipulating notices in the frontend.

## API

### `addDefaultNotice( text = '', noticeProps = {} )`

Create a new notice with `default` status. If the context is not specified in the `options` object, the current context is used.

| Argument      | Type   | Description                                                                                                                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | string | Text to be displayed in the notice.                                                                                                                                                      |
| `noticeProps` | Object | Object with the notice props. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `addErrorNotice( text = '', noticeProps = {} )`

Create a new error notice. If the context is not specified in the `options` object, the current context is used.

| Argument      | Type   | Description                                                                                                                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | string | Text to be displayed in the notice.                                                                                                                                                      |
| `noticeProps` | Object | Object with the notice props. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `addWarningNotice( text = '', noticeProps = {} )`

Create a new warning notice. If the context is not specified in the `options` object, the current context is used.

| Argument      | Type   | Description                                                                                                                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | string | Text to be displayed in the notice.                                                                                                                                                      |
| `noticeProps` | Object | Object with the notice props. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `addInfoNotice( text = '', noticeProps = {} )`

Create a new info notice. If the context is not specified in the `options` object, the current context is used.

| Argument      | Type   | Description                                                                                                                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | string | Text to be displayed in the notice.                                                                                                                                                      |
| `noticeProps` | Object | Object with the notice props. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `addSuccessNotice( text = '', noticeProps = {} )`

Create a new success notice. If the context is not specified in the `options` object, the current context is used.

| Argument      | Type   | Description                                                                                                                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | string | Text to be displayed in the notice.                                                                                                                                                      |
| `noticeProps` | Object | Object with the notice props. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `addSnackbarNotice( text = '', noticeProps = {} )`

Create a new snackbar notice. If the context is not specified in the `options` object, the current context is used.

| Argument      | Type   | Description                                                                                                                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | string | Text to be displayed in the notice.                                                                                                                                                      |
| `noticeProps` | Object | Object with the notice props. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `hasNoticesOfType( type )`

Checks whether there are notices of the provided type in the current context.

| Argument | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| `type`   | string | Type of the notices to check. |

### `notices`

An array of the notices in the current context.

### `removeNotice( id, ctx )`

Remove an existing notice. If the context is not specified, the current context is used.

| Argument | Type   | Description                                                                                                 |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `id`     | string | Id of the notice to remove.                                                                                 |
| `ctx`    | string | Context where the notice to remove is stored. If the context is not specified, the current context is used. |

### `removeNotices( status = null )`

Remove all notices from the current context. If a `status` is provided, only the notices with that status are removed.

| Argument | Type   | Description                                                                                           |
| -------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `status` | string | Status that notices must match to be removed. If not provided, all notices of any status are removed. |

### `setIsSuppressed( val )`

Whether notices are suppressed. If true, it will hide the notices from the frontend.

| Argument | Type    | Description                 |
| -------- | ------- | --------------------------- |
| `val`    | boolean | Id of the notice to remove. |

# StoreNoticesProvider

The `StoreNoticesProvider` allows managing notices in the frontend. Notices are rendered on top of the children, except notices of type snackbars, which are displayed in the bottom left corner and disappear after a certain time.

Internally, it uses the `StoreNoticesContext` which relies on the [`notices` package](https://github.com/WordPress/gutenberg/tree/master/packages/notices) from Gutenberg.

## Actions

### `createNotice( status = 'default', content = '', options = {} )`

This action creates a new notice. If the context is not specified in the `options` object, the current context is used.

| Argument  | Type   | Description                                                                                                                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `status`  | string | One of the statuses listed below.                                                                                                                                                          |
| `content` | string | Text to be displayed in the notice.                                                                                                                                                        |
| `options` | Object | Object with the notice options. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `createSnackbarNotice( content = '', options = {} )`

This action creates a new snackbar notice. If the context is not specified in the `options` object, the current context is used.

| Argument  | Type   | Description                                                                                                                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content` | string | Text to be displayed in the notice.                                                                                                                                                        |
| `options` | Object | Object with the notice options. Refer to the [Gutenberg docs](https://github.com/WordPress/gutenberg/blob/master/packages/notices/src/store/actions.js#L46) to know the available options. |

### `removeNotice( id, ctx )`

This action removes an existing notice. If the context is not specified, the current context is used.

| Argument | Type   | Description                                                                                                 |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `id`     | string | Id of the notice to remove.                                                                                 |
| `ctx`    | string | Context where the notice to remove is stored. If the context is not specified, the current context is used. |

### `setIsSuppressed( val )`

Whether notices are suppressed. If true, it will hide the notices from the frontend.

| Argument | Type    | Description                 |
| -------- | ------- | --------------------------- |
| `val`    | boolean | Id of the notice to remove. |

## Statuses

All notices must have one of the following status: `default`, `error`, `success`, `info`, `warning`.

# Example usage

The following example shows a `CheckoutProcessor` component that displays an error notice when the payment process fails and it removes it every time the payment is started. When the payment is completed correctly, it shows a snackbar notice.

```
const CheckoutProcessor = () => {
	const { addErrorNotice, addSnackbarNotice, removeNotice } = useStoreNotices();
	// ...
	const paymentFail = () => {
		addErrorNotice( 'Something went wrong.', { id: 'checkout' } );
	};
	const paymentStart = () => {
		removeNotice( 'checkout' );
	};
	const paymentSuccess = () => {
		addSnackbarNotice( 'Payment successfully completed.' );
	};
	// ...
};
```

```
<StoreNoticesProvider context="wc/checkout">
	// ...
	<CheckoutProcessor />
</StoreNoticesProvider>
```
