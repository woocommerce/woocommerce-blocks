/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useCollectionData } from '@woocommerce/base-context/hooks';
import { Disabled } from '@wordpress/components';
import FilterResetButton from '@woocommerce/base-components/filter-reset-button';

/**
 * Internal dependencies
 */
import { EditProps } from './types';
import { getFormattedPrice } from './utils';

const Edit = ( { setAttributes }: EditProps ) => {
	const blockProps = useBlockProps();
	const { results } = useCollectionData( {
		queryPrices: true,
		isEditor: true,
		queryState: {},
	} );

	useEffect( () => {
		setAttributes( {
			filterData: getFormattedPrice( results ),
		} );
	}, [ results, setAttributes ] );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				template={ [
					[ 'woocommerce/collection-price-filter-slider' ],
				] }
				renderAppender={ () => null }
			/>
			<Disabled>
				<div className="actions">
					<FilterResetButton onClick={ () => false } />
				</div>
			</Disabled>
		</div>
	);
};

export default Edit;
