/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useCollectionData } from '@woocommerce/base-context/hooks';
import TemplateComponent from 'react-mustache-template-component';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { getFormattedPrice } from './utils';
import { EditProps } from './types';
import { Inspector } from './inspector';

const Edit = ( props: EditProps ) => {
	const blockProps = useBlockProps();
	const { results } = useCollectionData( {
		queryPrices: true,
		isEditor: true,
		queryState: {},
	} );
	const { minPrice, maxPrice } = getFormattedPrice( results );
	const template = getSetting< string >( 'priceFilterOutputTemplate' );

	return (
		<div { ...blockProps }>
			<Inspector { ...props } />
			<TemplateComponent
				template={ template }
				data={ {
					minPrice,
					maxPrice,
					minRange: minPrice,
					maxRange: maxPrice,
					isEditor: true,
					...props.attributes,
				} }
			/>
		</div>
	);
};

export default Edit;
