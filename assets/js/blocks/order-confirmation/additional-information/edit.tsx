/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import { Icon, info } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-additional-information',
	} );

	return (
		<div { ...blockProps }>
			<Placeholder
				icon={ <Icon icon={ info } /> }
				label={ __(
					'Additional Information',
					'woo-gutenberg-products-block'
				) }
				instructions={ __(
					'Displays additional information provided by third-party extensions for the current order. This block will be hidden if no extensions provide additional information.',
					'woo-gutenberg-products-block'
				) }
				withIllustration={ true }
			/>
		</div>
	);
};

export default Edit;
