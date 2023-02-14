/**
 * External dependencies
 */
import type { ComponentType, HTMLProps, SVGProps } from 'react';
import {
	cloneElement,
	createElement,
	Component,
	isValidElement,
} from '@wordpress/element';
import { SVG } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import Dashicon from '../dashicon';
import type { IconKey as DashiconIconKey } from '../dashicon/types';

type IconType< P > = DashiconIconKey | ComponentType< P > | JSX.Element;

interface BaseProps< P > {
	/**
	 * The icon to render. Supported values are: Dashicons (specified as
	 * strings), functions, Component instances and `null`.
	 *
	 * @default null
	 */
	icon?: IconType< P > | null;
	/**
	 * The size (width and height) of the icon.
	 *
	 * @default 24
	 */
	size?: number;
}

type AdditionalProps< T > = T extends ComponentType< infer U >
	? U
	: T extends DashiconIconKey
	? SVGProps< SVGSVGElement >
	: object;

export type Props< P > = BaseProps< P > & AdditionalProps< IconType< P > >;

function Icon< P >( {
	icon = null,
	size = 24,
	...additionalProps
}: Props< P > ) {
	if ( typeof icon === 'string' ) {
		return (
			<Dashicon
				icon={ icon }
				{ ...( additionalProps as HTMLProps< HTMLSpanElement > ) }
			/>
		);
	}

	if ( isValidElement( icon ) && Dashicon === icon.type ) {
		return cloneElement( icon, {
			...additionalProps,
		} );
	}

	if ( typeof icon === 'function' ) {
		if ( icon.prototype instanceof Component ) {
			return createElement( icon, {
				size,
				...additionalProps,
			} as unknown as P );
		}

		return ( icon as ( ...args ) => JSX.Element )( {
			size,
			...additionalProps,
		} );
	}

	if ( icon && ( icon.type === 'svg' || icon.type === SVG ) ) {
		const appliedProps = {
			width: size,
			height: size,
			...icon.props,
			...additionalProps,
		};

		return <SVG { ...appliedProps } />;
	}

	if ( isValidElement( icon ) ) {
		return cloneElement( icon, {
			size,
			...additionalProps,
		} );
	}

	return icon;
}

export default Icon;
