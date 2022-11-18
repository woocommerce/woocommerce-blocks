export interface StoreNoticesState {
	containers: Record<
		string,
		React.MutableRefObject< HTMLDivElement | null >
	>;
}

export const defaultStoreNoticesState: StoreNoticesState = {
	containers: {},
};
