/**
 * External dependencies
 */
import { createHigherOrderComponent, pure } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { getValidBlockAttributes } from '../utils/render-frontend';

/**
 * HOC that filters given attributes by valid block attribute values, or uses defaults if undefined.
 *
 * @param {Array} blockAttributes Component being wrapped.
 */
const withFilteredAttributes = ( blockAttributes ) =>
	createHigherOrderComponent(
		( WrappedComponent ) =>
			pure( ( ownProps ) => {
				const validBlockAttributes = getValidBlockAttributes(
					blockAttributes,
					ownProps
				);

				return (
					<WrappedComponent
						{ ...ownProps }
						{ ...validBlockAttributes }
					/>
				);
			} ),
		'withFilteredAttributes'
	);

export default withFilteredAttributes;
