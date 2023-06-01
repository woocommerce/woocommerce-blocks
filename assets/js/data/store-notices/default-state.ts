export interface StoreNoticesState {
	containers: string[];
	highlightedNotices: { context: string; id: string }[];
}

export const defaultStoreNoticesState: StoreNoticesState = {
	containers: [],
	highlightedNotices: [],
};
