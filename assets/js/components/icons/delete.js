/**
 * External dependencies
 */
import { Icon } from '@wordpress/components';

// This is named `delete` as it is the `delete_outline` icon from Material.
// https://material.io/resources/icons/?icon=delete_outline&style=baseline
// We are using it as `trash` or `trashcan` or `remove-item`.
export default () => (
	<Icon
		className="material-icon"
		icon={
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
				<path fill="none" d="M0 0h24v24H0V0z" />
			</svg>
		}
	/>
);
