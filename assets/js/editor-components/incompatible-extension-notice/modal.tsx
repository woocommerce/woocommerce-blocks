/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import styled from '@emotion/styled';
import { Modal as ModalComponent } from '@wordpress/components';

export const Modal = styled( ModalComponent )`
	max-width: 600px;
	border-radius: 4px;
	@media ( min-width: 600px ) {
		min-width: 560px;
	}

	.components-modal__header {
		padding: 12px 24px;
		border-bottom: 1px solid #e0e0e0;
		position: relative;
		height: auto;
		width: auto;
		margin: 0 -24px 16px;

		@media ( max-width: 599px ) {
			button {
				display: none;
			}
		}
	}

	.components-modal__content {
		margin: 0;
		padding: 0 24px;

		@media ( max-width: 599px ) {
			display: flex;
			flex-direction: column;

			hr:last-of-type {
				margin-top: auto;
			}
		}

		ul {
			list-style: disc inside;
			margin: 0 0 24px;
		}
	}
`;

export const ModalContent = ( {
	blockType = 'woocommerce/cart',
}: {
	blockType: 'woocommerce/cart' | 'woocommerce/checkout';
} ): JSX.Element => {
	const message =
		blockType === 'woocommerce/cart'
			? __(
					'If you continue, the cart block will be replaced with the classic cart shortcode. This means you may lose:',
					'woo-gutenberg-products-block'
			  )
			: __(
					'If you continue, the checkout block will be replaced with the classic checkout shortcode. This means you may lose:',
					'woo-gutenberg-products-block'
			  );
	return (
		<>
			<p>{ message }</p>
			<ul className="cross-list">
				<li>
					{ __(
						'Customizations and updates to the block',
						'woo-gutenberg-products-block'
					) }
				</li>
				{ blockType === 'woocommerce/checkout' && (
					<li>
						{ __(
							'Additional local pickup options created for the new checkout',
							'woo-gutenberg-products-block'
						) }
					</li>
				) }
			</ul>
		</>
	);
};

export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	border-top: 1px solid #e0e0e0;
	margin: 24px -24px 0;
	padding: 24px;

	> * {
		&:not( :first-of-type ) {
			margin-left: 8px;
		}
	}

	.button-link-delete {
		margin-right: auto;
		color: #d63638;
	}
`;
