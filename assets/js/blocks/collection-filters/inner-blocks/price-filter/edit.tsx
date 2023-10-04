/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useCollectionData } from '@woocommerce/base-context/hooks';
import { Disabled } from '@wordpress/components';
import FilterResetButton from '@woocommerce/base-components/filter-reset-button';

/**
 * Internal dependencies
 */
import { getFormattedPrice } from './utils';
import { EditProps } from './types';
import { Inspector } from './inspector';
import { PriceSlider } from './price-slider';

const Edit = ( props: EditProps ) => {
	const blockProps = useBlockProps();
	const { results } = useCollectionData( {
		queryPrices: true,
		isEditor: true,
		queryState: {},
	} );

	return (
		<div { ...blockProps }>
			<Inspector { ...props } />
			<Disabled>
				<div className="controls">
					<PriceSlider
						{ ...props.attributes }
						{ ...getFormattedPrice( results ) }
					/>
				</div>
				<div className="actions">
					<FilterResetButton onClick={ () => false } />
				</div>
			</Disabled>
		</div>
	);
};

export default Edit;
