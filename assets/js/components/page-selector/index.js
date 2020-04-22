/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEditorContext } from '@woocommerce/base-context';
/**
 * Internal dependencies
 */
import { formatTitle } from '../utils';

const PageSelector = ( { setPageId, pageId, defaultPageId, labels } ) => {
	const { currentPostId } = useEditorContext();
	const pages =
		useSelect( ( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'page', {
				status: 'publish',
				orderby: 'title',
				order: 'asc',
				per_page: 100,
			} );
		}, [] ) || null;
	// We should not render this if this page is the default one page
	// and the link to option is set to default.
	if ( ! ( currentPostId === defaultPageId && pageId === 0 ) && pages ) {
		return (
			<PanelBody title={ labels.title }>
				<SelectControl
					label={ __( 'Link to', 'woo-gutenberg-products-block' ) }
					value={ pageId }
					options={ [
						{
							label: labels.default,
							value: 0,
						},
						...pages.map( ( page ) => {
							return {
								label: formatTitle( page, pages ),
								value: parseInt( page.id, 10 ),
							};
						} ),
					] }
					onChange={ ( value ) => setPageId( parseInt( value, 10 ) ) }
				/>
			</PanelBody>
		);
	}
	return null;
};

export default PageSelector;
