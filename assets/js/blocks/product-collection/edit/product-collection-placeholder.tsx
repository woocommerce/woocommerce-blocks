/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Icon from '../icon';
import type { QueryEditComponentProps } from '../types';

const QueryPlaceholder = ( props: QueryEditComponentProps ) => {
	const { openPatternSelectionModalOpen } = props;
	const blockProps = useBlockProps();
	const tempEventHandler = () => {
		/** Temp handler */
	};

	return (
		<div { ...blockProps }>
			<Placeholder
				icon={ Icon }
				label={ __(
					'Product Collection',
					'woo-gutenberg-products-block'
				) }
				instructions={ __(
					'Choose a pattern for the query loop or start blank.',
					'woo-gutenberg-products-block'
				) }
			>
				<Button
					variant="primary"
					onClick={ openPatternSelectionModalOpen }
				>
					{ __(
						'Choose Collection',
						'woo-gutenberg-products-block'
					) }
				</Button>
				<Button variant="tertiary" onClick={ tempEventHandler }>
					{ __(
						'New custom collection',
						'woo-gutenberg-products-block'
					) }
				</Button>
			</Placeholder>
		</div>
	);
};

export default QueryPlaceholder;
