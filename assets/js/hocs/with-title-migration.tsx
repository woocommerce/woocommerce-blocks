/**
 * External dependencies
 */
import UpdateFilterHeadingsPrompt from '@woocommerce/base-components/filter-update-heading';
import { getSettingWithCoercion } from '@woocommerce/settings';
import type { BlockEditProps } from '@wordpress/blocks';
import { isBoolean } from '@woocommerce/types';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import useUpdateFilterHeadings from '../shared/hooks/use-update-filter-headings';

interface Attributes {
	heading: string;
	headingLevel: number;
	className?: string;
}

const withTitleMigration = (
	OriginalComponent: React.FunctionComponent< Record< string, unknown > >
) => {
	return ( props: BlockEditProps< Attributes > ): JSX.Element => {
		const { attributes, setAttributes, clientId } = props;
		const { className, heading, headingLevel } = attributes;

		const blockProps = useBlockProps( {
			className,
		} );

		/**
		 * Since WooCommerce Blocks 8.2.0, we have decoupled the block title from the filter block itself.
		 * So we need to prompt users who are already using the block with title to click update,
		 * where we will create a title block for them.
		 */
		const shouldRemoveBlockTitle = getSettingWithCoercion(
			'shouldRemoveBlockTitle',
			false,
			isBoolean
		);

		const updateBlockHeading = useUpdateFilterHeadings( {
			heading,
			headingLevel,
			clientId,
			setAttributes,
		} );

		return (
			<div { ...blockProps }>
				{ shouldRemoveBlockTitle && heading && (
					<UpdateFilterHeadingsPrompt
						onClick={ updateBlockHeading }
					/>
				) }
				<OriginalComponent { ...props } />
			</div>
		);
	};
};

export default withTitleMigration;
