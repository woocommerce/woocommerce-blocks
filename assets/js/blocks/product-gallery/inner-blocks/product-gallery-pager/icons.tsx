/**
 * External dependencies
 */
import { SVG } from '@wordpress/primitives';

export const ProductGalleryBlockIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M5.00018 11L7.00018 11L7.00018 13H5.00018V11ZM11.0002 11L13.0002 11V13H11.0002V11ZM17.0002 11L19.0002 11V13H17.0002V11Z"
			fill="#1E1E1E"
		/>
	</svg>
);

export const PagerDotIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
		<circle cx="6" cy="6" r="6" fill="black" fillOpacity="0.2" />
	</SVG>
);

export const PagerSelectedDotIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
		<circle cx="6" cy="6" r="6" fill="black" />
	</SVG>
);
