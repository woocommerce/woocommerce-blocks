/**
 * External dependencies
 */
import { Icon } from '@wordpress/components';

export default ( { className } ) => (
	<Icon
		className={ className }
		icon={
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M21.45,0H12.14L.75,11.4A2.55,2.55,0,0,0,.75,15L9,23.25a2.55,2.55,0,0,0,3.61,0L24,11.86V2.55A2.55,2.55,0,0,0,21.45,0Z" />
				<circle fill="#fff" cx="18.07" cy="5.75" r="2.47" />
				<text
					fill="#fff"
					style={ {
						fontSize: '12px',
						fontFamily:
							'SFCompactRounded-Black, SF Compact Rounded',
						fontWeight: 800,
					} }
					transform="translate(5.28 17.41)"
				>
					%
				</text>
			</svg>
		}
	/>
);
