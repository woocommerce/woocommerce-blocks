/**
 * External dependencies
 */
import { subscribe, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { isNumber } from '@woocommerce/types';

interface TemplateChangeDetectorSubject {
	add( observer: TemplateChangeDetectorObserver ): void;
	getPreviousTemplateId(): string | undefined;
	getCurrentTemplateId(): string | undefined;
	notify(): void;
}

export class TemplateChangeDetector implements TemplateChangeDetectorSubject {
	private previousTemplateId: string | undefined;
	private currentTemplateId: string | undefined;

	private observers: TemplateChangeDetectorObserver[] = [];

	constructor() {
		subscribe( () => {
			this.checkIfTemplateHasChangedAndUpdateCurrentTemplateIfNeeded();
		}, 'core/edit-site' );
	}

	public add( observer: TemplateChangeDetectorObserver ): void {
		this.observers.push( observer );
	}

	/**
	 * Trigger an update in each subscriber.
	 */
	public notify(): void {
		for ( const observer of this.observers ) {
			observer.update( this );
		}
	}

	public getPreviousTemplateId() {
		return this.previousTemplateId;
	}

	public getCurrentTemplateId() {
		return this.currentTemplateId;
	}

	private parseTemplateId(
		templateId: string | number | undefined
	): string | undefined {
		// With GB 16.3.0 the return type can be a number: https://github.com/WordPress/gutenberg/issues/53230
		const parsedTemplateId = isNumber( templateId )
			? undefined
			: templateId;
		return parsedTemplateId?.split( '//' )[ 1 ];
	}

	public checkIfTemplateHasChangedAndUpdateCurrentTemplateIfNeeded(): void {
		this.previousTemplateId = this.currentTemplateId;

		const editedPostId = select( 'core/edit-site' ).getEditedPostId<
			string | number | undefined
		>();
		this.currentTemplateId = this.parseTemplateId( editedPostId );
		const hasChangedTemplate =
			this.previousTemplateId !== this.currentTemplateId;
		const hasTemplateId = Boolean( this.currentTemplateId );


		if ( ! hasChangedTemplate || ! hasTemplateId ) {
			return;
		}

		this.notify();
	}
}

interface TemplateChangeDetectorObserver {
	update( subject: TemplateChangeDetectorSubject ): void;
}

export class TemplateChangeObserver implements TemplateChangeDetectorObserver {
	update( subject: TemplateChangeDetectorSubject ): void {
		console.log(
			`previous: ${ subject.getPreviousTemplateId() } current: ${ subject.getCurrentTemplateId() }`
		);
	}
}
