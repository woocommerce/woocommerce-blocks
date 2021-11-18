/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { createSlotFill, hasValidFills, useSlot } from '../../slot';

const slotName = '__experimentalFooterTotalMeta';

const {
	Fill: ExperimentalFooterTotalMeta,
	Slot: FooterTotalMetaSlot,
} = createSlotFill( slotName );

const Slot = ( { className, extensions, cart } ) => {
	const { fills } = useSlot( slotName );
	return (
		hasValidFills( fills ) && (
			<FooterTotalMetaSlot
				className={ classnames(
					className,
					'wc-block-components-footer-total-meta'
				) }
				fillProps={ { extensions, cart } }
			/>
		)
	);
};

ExperimentalFooterTotalMeta.Slot = Slot;

export default ExperimentalFooterTotalMeta;
