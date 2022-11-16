/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	createContext,
	useContext,
	useCallback,
	useState,
} from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import type { Options as NoticeOptions } from '@wordpress/notices';
import { PAYMENT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { StoreNoticeContextType } from './types';
import { useEditorContext } from '../editor-context';
import { noticeContexts } from '../../event-emit/utils';

const StoreNoticeContext = createContext< StoreNoticeContextType >( {
	createNotice: () => void 0,
	registerContainer: () => void 0,
	suppressNotices: false,
} );

export const useStoreNoticeContext = () => {
	return useContext( StoreNoticeContext );
};

export const StoreNoticeProvider = ( {
	children,
	defaultContext,
}: {
	children: JSX.Element | JSX.Element[];
	defaultContext: string;
} ): JSX.Element => {
	const { createNotice: dispatchCreateNotice } =
		useDispatch( 'core/notices' );
	const { isEditor } = useEditorContext();
	const isExpressPaymentMethodActive = useSelect( ( select ) =>
		select( PAYMENT_STORE_KEY ).isExpressPaymentMethodActive()
	);

	// Maintains a list of containers that have been registered in the hierarchy.
	const [ containerRefs, setContainerRefs ] = useState( {} );
	const registerContainer = useCallback(
		(
			containerContext: string,
			ref: React.MutableRefObject< HTMLDivElement | null >
		) => {
			setContainerRefs( ( current ) => ( {
				...current,
				[ containerContext ]: ref,
			} ) );
		},
		[ setContainerRefs ]
	);

	/**
	 * Wrapper for createNotice used to create the correct type of notice based on the provided context.
	 */
	const createNotice = useCallback<
		StoreNoticeContextType[ 'createNotice' ]
	>(
		(
			status: 'error' | 'warning' | 'info',
			message: string,
			options: Partial< NoticeOptions >
		) => {
			let noticeContext = options?.context || defaultContext;

			// If the container ref was not registered, show the notice in the default context instead so it is visible.
			if ( ! Object.keys( containerRefs ).includes( noticeContext ) ) {
				noticeContext = defaultContext;
			}

			const type =
				noticeContext === defaultContext ? 'snackbar' : 'default';

			dispatchCreateNotice( status, message, {
				isDismissible: true,
				...options,
				type,
				context: noticeContext,
			} );
		},
		[ containerRefs, defaultContext, dispatchCreateNotice ]
	);

	const contextData = {
		createNotice,
		registerContainer,
		suppressNotices: isEditor || isExpressPaymentMethodActive,
	} as StoreNoticeContextType;

	return (
		<StoreNoticeContext.Provider value={ contextData }>
			<Button
				onClick={ () =>
					createNotice(
						'error',
						__(
							'An error occurred!',
							'woo-gutenberg-products-block'
						),
						{
							context: defaultContext,
						}
					)
				}
			>
				{ __(
					'Generate an error notice',
					'woo-gutenberg-products-block'
				) }
			</Button>
			{ Object.values( noticeContexts ).map( ( contextValue ) => {
				return (
					<Button
						key={ contextValue }
						onClick={ () => {
							createNotice(
								'error',
								__(
									'An error occurred!',
									'woo-gutenberg-products-block'
								),
								{
									context: contextValue,
								}
							);
						} }
					>
						{ contextValue + ' Error' }
					</Button>
				);
			} ) }
			{ children }
		</StoreNoticeContext.Provider>
	);
};
