/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

const preview = (
	<SVG width="400" height="400" xmlns="http://www.w3.org/2000/svg">
		<g fill="none" fillRule="evenodd">
			<Path fill="#FFF" d="M0 0h400v400H0z" />
			<Path
				fill="#E2E4E7"
				d="M10 10h120v120H10zM270 10h120v120H270zM140 10h120v120H140zM37 166h66v25H37zM15 140h112v16H15zM167 166h66v25h-66zM150 140h100v16H150zM297 166h66v25h-66zM290 140h80v16h-80zM10 209h120v120H10zM270 209h120v120H270zM140 209h120v120H140zM37 365h66v25H37zM46 339h49v16H46zM167 365h66v25h-66zM140 339h112v16H140zM297 365h66v25h-66zM280 339h100v16H280z"
			/>
		</g>
	</SVG>
);

export default preview;
