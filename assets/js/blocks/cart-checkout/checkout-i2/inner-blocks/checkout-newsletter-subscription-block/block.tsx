/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
	useCheckoutSubmit,
	useCheckoutData,
} from '@woocommerce/base-context/hooks';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';

const Block = (): JSX.Element => {
	const [ checked, setChecked ] = useState( false );
	const { isDisabled } = useCheckoutSubmit();
	const { setCustomData } = useCheckoutData();

	useEffect( () => {
		setCustomData( 'newsletter', checked );
	}, [ checked, setCustomData ] );

	return (
		<CheckboxControl
			id="subscribe-to-newsletter"
			checked={ checked }
			onChange={ () => setChecked( ( value ) => ! value ) }
			disabled={ isDisabled }
		>
			<span
				dangerouslySetInnerHTML={ {
					__html: __(
						'I want to receive updates about products and promotions.',
						'woo-gutenberg-products-block'
					),
				} }
			/>
		</CheckboxControl>
	);
};

export default Block;
