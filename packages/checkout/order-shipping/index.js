/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';

const slotName = '__experimentalOrderShipping';
const { Fill, Slot } = createSlotFill( slotName );

function ExperimentalOrderShipping( { children } ) {
	return (
		<Fill>
			<BlockErrorBoundary
				renderError={ CURRENT_USER_IS_ADMIN ? null : () => null }
			>
				{ children }
			</BlockErrorBoundary>
		</Fill>
	);
}

ExperimentalOrderShipping.Slot = ( { className } ) => {
	return (
		<Slot
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-order-meta'
			) }
		/>
	);
};

export default ExperimentalOrderShipping;
