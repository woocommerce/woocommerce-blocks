/**
 * Internal dependencies
 */
import { BlockRegistrationManager } from './blocks-registration-manager';
import {
	TemplateChangeDetector,
} from './template-change-detector';

wp.domReady( () => {
	const templateChangeDetector = new TemplateChangeDetector();
	const blockRegistrationManager = new BlockRegistrationManager();
	templateChangeDetector.add( blockRegistrationManager );
} );
