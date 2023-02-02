export const STORE_KEY = 'wc/store/payment';

export enum STATUS {
	PRISTINE = 'pristine',
	IDLE = 'idle',
	STARTED = 'started',
	PROCESSING = 'processing',
	READY = 'ready',
	ERROR = 'has_error',
	FAILED = 'failed',
	SUCCESS = 'success',
}
