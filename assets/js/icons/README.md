# Icons

WooCommerce Blocks Icons Library.

## Usage

```js
import { bill, woo } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

<Icon icon={ bill } />
<Icon icon={ bill } size={ 16 } />
<Icon icon={ woo } width={ 20 } height={ Math.floor( 20 * 1.67 ) } />
```

## Adding Icons

1. Add the icon file to `./library` folder.
2. Make sure to use `SVG` primitive from `wordpress-components` and not a native svg. `SVG` offers more accessibility features.
3. Remove width and height since they're handled by Icon.
4. Remove any hardcoded colors on the svg. If necessary, use `CurrentColor`.
5. Export the Icon in `./library/index.js`.
