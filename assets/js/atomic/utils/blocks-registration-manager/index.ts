/**
 * External dependencies
 */
import { subscribe, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import productGalleryBlockMetadata from '../../../blocks/product-gallery/block.json';
import { isNumber } from '@woocommerce/types';
import { TemplateChangeDetector, TemplateChangeObserver } from './template-change-detector';

interface RegisterBlockParameters {
	currentTemplateId: string;
	previousTemplateId: string;
}

interface RegistrationStrategy {
	registerBlock(registerBlockParameters: RegisterBlockParameters): void;
	unregisterBlock(unregisterBlockParameters: RegisterBlockParameters): void;
}

export class BlockRegistrationManager {
    private registrationStrategy: RegistrationStrategy

	constructor(registrationStrategy: RegistrationStrategy) {
		this.registrationStrategy = registrationStrategy;
	}

    setRegistrationStrategy(registrationStrategy: RegistrationStrategy) {
		this.registrationStrategy = registrationStrategy;
	}

    registerBlock(registerBlockParameters: RegisterBlockParameters) {
		return this.registrationStrategy.registerBlock( registerBlockParameters);
	}

	unregisterBlock(unregisterBlockParameters: RegisterBlockParameters) {
		return this.registrationStrategy.unregisterBlock( unregisterBlockParameters);
	}
}

const blocksWithRestriction = {
	[productGalleryBlockMetadata.name]: {
		allowedTemplates: ['single-product'],
		allowedTemplateParts: ['product-gallery'],
	},
};

wp.domReady(() => {
	const templateChangeDetector = new TemplateChangeDetector();
	templateChangeDetector.add(new TemplateChangeObserver())

	// subscribe( () => {
	// 	console.log('changed site', count++);
	// }, 'core/edit-site' );
});
