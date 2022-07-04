/**
 * External dependencies
 */
// import { __, sprintf } from '@wordpress/i18n';
// import { speak } from '@wordpress/a11y';
// import { usePrevious, useShallowEqual } from '@woocommerce/base-hooks';
// import {
// 	useQueryStateByKey,
// 	useQueryStateByContext,
// 	useCollectionData,
// } from '@woocommerce/base-context/hooks';
// import { getSetting, getSettingWithCoercion } from '@woocommerce/settings';
// import {
// 	useCallback,
// 	useEffect,
// 	useState,
// 	useMemo,
// 	useRef,
// } from '@wordpress/element';
// import CheckboxList from '@woocommerce/base-components/checkbox-list';
// import FilterSubmitButton from '@woocommerce/base-components/filter-submit-button';
// import Label from '@woocommerce/base-components/filter-element-label';
// import isShallowEqual from '@wordpress/is-shallow-equal';
// import { decodeEntities } from '@wordpress/html-entities';
// import { isBoolean, objectHasProp } from '@woocommerce/types';
// import { addQueryArgs, removeQueryArgs } from '@wordpress/url';
import { PREFIX_QUERY_ARG_FILTER_TYPE } from '@woocommerce/utils';
import Rating from '@woocommerce/base-components/product-rating';
import {
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
} from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import { previewOptions } from './preview';
// import './style.scss';
import { Attributes } from './types';

export const QUERY_PARAM_KEY = PREFIX_QUERY_ARG_FILTER_TYPE + 'stock_status';

/**
 * Component displaying an stock status filter.
 *
 * @param {Object}  props            Incoming props for the component.
 * @param {Object}  props.attributes Incoming block attributes.
 * @param {boolean} props.isEditor
 */
const RatingFilterBlock = ( {
	attributes: blockAttributes,
	isEditor = false,
}: {
	attributes: Attributes;
	isEditor?: boolean;
} ) => {
	const TagName =
		`h${ blockAttributes.headingLevel }` as keyof JSX.IntrinsicElements;

	const [ queryState ] = useQueryStateByContext();
	const [ ratingProductQuery, setProductRatingQuery ] = useQueryStateByKey(
		'rating_counts',
		[]
	);

	const { results: filteredCounts, isLoading: filteredCountsLoading } =
		useCollectionData( {
			queryRating: true,
			queryState,
		} );

	console.log( filteredCounts );

	return (
		<>
			{ ! isEditor && blockAttributes.heading && (
				<TagName className="wc-block-rating-filter__title">
					{ blockAttributes.heading }
				</TagName>
			) }
			<Rating
				averageRating={ 5 }
				ratingCount={ 14 }
				className="wp-custom-class"
				productCount={ 11 }
				showProductLink={ false }
			/>
			<Rating
				averageRating={ 4 }
				ratingCount={ 14 }
				className="wp-custom-class"
				productCount={ 2 }
				showProductLink={ false }
			/>
			<Rating
				averageRating={ 3 }
				ratingCount={ 14 }
				className="wp-custom-class"
				productCount={ 34 }
				showProductLink={ false }
			/>
			<Rating
				averageRating={ 2 }
				ratingCount={ 14 }
				className="wp-custom-class"
				productCount={ 76 }
				showProductLink={ false }
			/>
			<Rating
				averageRating={ 1 }
				ratingCount={ 14 }
				className="wp-custom-class"
				productCount={ 4 }
				showProductLink={ false }
			/>
		</>
	);
};

export default RatingFilterBlock;
