/**
 * External dependencies
 */
import { Icon, Placeholder, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BLOCK_NAMES } from './constants';
import { getClassPrefixFromName } from './utils';

export const withFeaturedItem = ( { emptyMessage, icon, label } ) => (
	Component
) => ( props ) => {
	const { isLoading, name } = props;

	const className = getClassPrefixFromName( name );
	const item =
		name === BLOCK_NAMES.featuredProduct ? props.product : props.category;

	const renderNoItem = () => (
		<Placeholder
			className={ className }
			icon={ <Icon icon={ icon } /> }
			label={ label }
		>
			{ isLoading ? <Spinner /> : emptyMessage }
		</Placeholder>
	);

	return item ? <Component { ...props } /> : renderNoItem();
};
