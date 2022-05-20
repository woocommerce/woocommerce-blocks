/**
 * External dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';
import { withSpokenMessages } from '@wordpress/components';
import { gridBlockPreview } from '@woocommerce/resource-previews';

/**
 * Internal dependencies
 */
import { Props } from './types';

const Block = ( props: Props ): JSX.Element => {
	const { attributes, name } = props;

	if ( attributes.isPreview ) {
		return gridBlockPreview;
	}

	return <ServerSideRender block={ name } attributes={ attributes } />;
};

export const ProductsByAttributeBlock = withSpokenMessages( Block );
