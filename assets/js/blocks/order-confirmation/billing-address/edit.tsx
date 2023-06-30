/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-billing-address',
	} );

	return (
		<div { ...blockProps }>
			<address>
				Han Solo
				<br />
				Test address 1<br />
				Test address 2<br />
				Test City, AL 90210
				<br />
				United States
				<br />
			</address>
		</div>
	);
};

export default Edit;
