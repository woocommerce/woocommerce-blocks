/**
 * External dependencies
 */
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */

const FrontendBlock = ( {
	text,
	checkbox,
}: {
	text: string;
	checkbox: boolean;
} ): JSX.Element => {
	const [ checked, setChecked ] = useState( false );
	return (
		<div className="wc-block-checkout__terms">
			{ checkbox ? (
				<>
					<CheckboxControl
						id="terms-condition"
						label={ text }
						checked={ checked }
						onChange={ () => setChecked( ( value ) => ! value ) }
					/>
				</>
			) : (
				<span dangerouslySetInnerHTML={ { __html: text } } />
			) }
		</div>
	);
};

export default FrontendBlock;
