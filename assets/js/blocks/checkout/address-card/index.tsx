/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { ALLOWED_COUNTRIES } from '@woocommerce/block-settings';
import type {
	CartShippingAddress,
	CartBillingAddress,
} from '@woocommerce/types';

/**
 * Internal dependencies
 */
import './style.scss';

const AddressCard = ( {
	address,
	onEdit,
	target,
	icon: IconComponent,
}: {
	address: CartShippingAddress | CartBillingAddress;
	onEdit: () => void;
	target: string;
	icon: JSX.Element;
} ): JSX.Element | null => {
	return (
		<div className="wc-block-components-address-card">
			<Icon
				icon={ IconComponent }
				className="wc-block-components-address-card__icon"
			/>
			<address>
				<span className="wc-block-components-address-card__address-section">
					{ address.first_name + ' ' + address.last_name }
				</span>
				<div className="wc-block-components-address-card__address-section">
					{ [
						address.address_1,
						address.address_2,
						address.city,
						address.state,
						address.postcode,
						ALLOWED_COUNTRIES[ address.country ]
							? ALLOWED_COUNTRIES[ address.country ]
							: address.country,
					]
						.filter( ( field ) => !! field )
						.map( ( field, index ) => (
							<span key={ `address-` + index }>{ field }</span>
						) ) }
				</div>
				{ address.phone ? (
					<div
						key={ `address-phone` }
						className="wc-block-components-address-card__address-section"
					>
						{ address.phone }
					</div>
				) : (
					''
				) }
			</address>
			{ onEdit && (
				<a
					role="button"
					href={ '#' + target }
					className="wc-block-components-address-card__edit"
					aria-label={ __(
						'Change address',
						'woo-gutenberg-products-block'
					) }
					onClick={ onEdit }
				>
					{ __( 'Change', 'woo-gutenberg-products-block' ) }
				</a>
			) }
		</div>
	);
};

export default AddressCard;
