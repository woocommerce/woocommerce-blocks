/**
 * External dependencies
 */
import { subscribe, select } from '@wordpress/data';
import { isNumber } from '@woocommerce/types';

interface TemplateChangeDetectorSubject {
	add( observer: TemplateChangeDetectorObserver ): void;
	getPreviousTemplateId(): string | undefined;
	getCurrentTemplateId(): string | undefined;
	notify(): void;
}

export interface TemplateChangeDetectorObserver {
	run( subject: TemplateChangeDetectorSubject ): void;
}

export class TemplateChangeDetector implements TemplateChangeDetectorSubject {
	private previousTemplateId: string | undefined;
	private currentTemplateId: string | undefined;
	private isPostOrPage: boolean;

	private observers: TemplateChangeDetectorObserver[] = [];

	constructor() {
		this.isPostOrPage = false;
		subscribe( () => {
			this.checkIfTemplateHasChangedAndNotifySubscribers();
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
			observer.run( this );
		}
	}

	public getPreviousTemplateId() {
		return this.previousTemplateId;
	}

	public getCurrentTemplateId() {
		return this.currentTemplateId;
	}

	public getIsPostOrPage() {
		return this.isPostOrPage;
	}

	private parseTemplateId(
		templateId: string | number | undefined
	): string | undefined {
		if ( isNumber( templateId ) ) {
			return String( templateId );
		}
		return templateId?.split( '//' )[ 1 ];
	}

	public checkIfTemplateHasChangedAndNotifySubscribers(): void {
		this.previousTemplateId = this.currentTemplateId;

		const postOrPageId = select( 'core/editor' )?.getCurrentPostId<
			string | number | undefined
		>();

		this.isPostOrPage = Boolean( postOrPageId );

		const editedPostId =
			postOrPageId ||
			select( 'core/edit-site' )?.getEditedPostId<
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
