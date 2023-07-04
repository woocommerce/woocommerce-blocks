/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, Button } from '@wordpress/components';
import { BlockEditProps } from '@wordpress/blocks';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ProductCollectionAttributes } from '../types';
import {
	getUpdateStateFromLocalStorage,
	setUpdateStateInLocalStorage,
} from '../../shared/scripts';

const FormattedNotice = ( { notice }: { notice: string } ) => {
	const strongText = 'Product Collection';
	const [ before, after ] = notice.split( strongText );

	return (
		<>
			{ before }
			<strong>{ strongText }</strong>
			{ after }
		</>
	);
};

const UpgradeNotice = (
	props: BlockEditProps< ProductCollectionAttributes > & {
		replaceBlocks: () => void;
	}
) => {
	const [ upgradeState, setUpgradeState ] = useState( 'not_seen' );
	useEffect( () => {
		const localStorageState = getUpdateStateFromLocalStorage();
		setUpgradeState( localStorageState );
		return () => {
			if ( upgradeState !== 'reverted' ) {
				setUpdateStateInLocalStorage( 'seen' );
			}
		};
	}, [ upgradeState ] );

	const displayNotice = upgradeState === 'not_seen';
	const notice = __(
		'Products (Beta) block was upgraded to Product Collection, an updated version with new features and simplified settings.',
		'woo-gutenberg-products-block'
	);

	const buttonLabel = __(
		'Revert to Products (Beta)',
		'woo-gutenberg-products-block'
	);

	const handleRemove = () => {
		setUpdateStateInLocalStorage( 'seen' );
		props.setAttributes( {
			displayUpgradeNotice: false,
		} );
	};

	const handleClick = () => {
		setUpdateStateInLocalStorage( 'reverted' );
		props.replaceBlocks();
	};

	return displayNotice ? (
		<Notice onRemove={ handleRemove }>
			<FormattedNotice notice={ notice } />
			<br />
			<br />
			<Button variant="link" onClick={ handleClick }>
				{ buttonLabel }
			</Button>
		</Notice>
	) : null;
};

export default UpgradeNotice;
