export const STORE_KEY = 'wc/store/payment';

export enum STATUS {
	PRISTINE = 'pristine',
	IDLE = 'idle',
	STARTED = 'started',
	PROCESSING = 'processing',
	ERROR = 'has_error',
	FAILED = 'failed',
	SUCCESS = 'success',
	READY = 'ready', // Indicates observers have finished processing and payment is ready to be processed.
}
