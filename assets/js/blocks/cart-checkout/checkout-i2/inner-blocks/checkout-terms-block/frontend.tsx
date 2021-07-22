/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import { useCheckoutContext, useStoreNotices } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import { termsConsentDefaultText, termsCheckboxDefaultText } from './constants';
import './style.scss';

const FrontendBlock = ( {
	text,
	checkbox,
}: {
	text: string;
	checkbox: boolean;
} ): JSX.Element => {
	const [ checked, setChecked ] = useState( false );
	const {
		dispatchActions,
		onCheckoutValidationBeforeProcessing,
	} = useCheckoutContext();
	const { addErrorNotice, removeNotice } = useStoreNotices();

	useEffect( () => {
		const unsubscribe = onCheckoutValidationBeforeProcessing( () => {
			if ( ! checked ) {
				return {
					errorMessage: __(
						'Please read and accept the terms and conditions to proceed with your order.',
						'woo-gutenberg-products-block'
					),
				};
			}
		} );
		return () => {
			unsubscribe();
		};
	}, [
		onCheckoutValidationBeforeProcessing,
		addErrorNotice,
		removeNotice,
		checked,
		dispatchActions,
	] );

	return (
		<div className="wc-block-checkout__terms">
			{ checkbox ? (
				<>
					<CheckboxControl
						id="terms-condition"
						checked={ checked }
						onChange={ () => setChecked( ( value ) => ! value ) }
					>
						<span
							dangerouslySetInnerHTML={ {
								__html: text || termsCheckboxDefaultText,
							} }
						/>
					</CheckboxControl>
				</>
			) : (
				<span
					dangerouslySetInnerHTML={ {
						__html: text || termsConsentDefaultText,
					} }
				/>
			) }
		</div>
	);
};

export default FrontendBlock;
