/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, Button } from '@wordpress/components';

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

export const UpgradeNotice = ( props: { upgradeBlock: () => void } ) => {
	const notice = __(
		'Upgrade all Products (Beta) blocks on this page to Product Collection for more features!',
		'woo-gutenberg-products-block'
	);

	const buttonLabel = __(
		'Upgrade to Product Collection',
		'woo-gutenberg-products-block'
	);

	const handleClick = () => {
		props.upgradeBlock();
	};

	return (
		<Notice isDismissible={ false }>
			<FormattedNotice notice={ notice } />
			<br />
			<br />
			<Button variant="link" onClick={ handleClick }>
				{ buttonLabel }
			</Button>
		</Notice>
	);
};
