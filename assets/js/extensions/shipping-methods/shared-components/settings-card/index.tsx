/**
 * External dependencies
 */
import { Card, CardBody } from '@wordpress/components';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './admin.scss';

const SettingsCard = ( {
	children,
	className = '',
	...props
}: {
	children: JSX.Element | JSX.Element[];
	className?: string;
} ): JSX.Element => (
	<Card>
		<CardBody
			className={ classNames( 'wc-blocks-settings-card', className ) }
			{ ...props }
		>
			{ children }
		</CardBody>
	</Card>
);

export default SettingsCard;
