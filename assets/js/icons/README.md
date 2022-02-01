# Icons

WooCommerce Blocks Icons Library.

## Usage

Note we use hte `Icon` component from `@wordpress/icons`, and the Icon SVG from `@woocommerce/icons`.

```js
import { woo } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

<Icon icon={ woo } />
<Icon icon={ woo } size={ 16 } />
<Icon icon={ woo } width={ 20 } height={ Math.floor( 20 * 1.67 ) } />
```

## Adding Icons

Before adding a new icon, make sure the icon is not already included in the [Library that comes with @wordpress/icons package](https://wordpress.github.io/gutenberg/?path=/story/icons-icon--library). If there is no existing icon suitable:

1. Add the icon file to `./library` folder.
2. Make sure to use `SVG` primitive from `@wordpress/primitives` and not a native svg. `SVG` offers more accessibility features.
3. Remove width and height since they're handled by Icon.
4. Remove any hardcoded colors on the svg. If necessary, use `CurrentColor`.
5. Export the Icon in `./library/index.js`.
