declare module 'sourcebuster' {
	interface SourcebusterReferralsOptions {
		host?: string;
		medium?: string;
		display?: string;
	}

	interface SourcebusterOrganicsOptions {
		host?: string;
		param?: string;
		display?: string;
	}

	interface SourcebusterTypeinAttributes {
		source?: string;
		medium?: string;
	}

	interface SourcebusterOptions {
		lifetime?: number;
		session_length?: number;
		domain?: string;
		isolate?: boolean;
		referrals?: SourcebusterReferralsOptions[];
		organics?: SourcebusterOrganicsOptions[];
		typein_attributes?: SourcebusterTypeinAttributes;
		timezone_offset?: number;
		campaign_param?: string;
		user_ip?: string;
		callback?: () => void;
	}

	interface SorucebusterVisitorSource {
		typ: string;
		src: string;
		mdm: string;
		cmp: string;
		cnt: string;
		trm: string;
	}

	interface SourcebusterVisitorSourceAdditional {
		fd: string;
		ep: string;
		rf: string;
	}

	interface SourcebusterParams {
		current: SorucebusterVisitorSource;
		current_add: SourcebusterVisitorSourceAdditional;
		first: SorucebusterVisitorSource;
		first_add: SourcebusterVisitorSourceAdditional;
		session: {
			pgs: number;
			cpg: string;
		};
		udata: {
			vst: number;
			uip: string;
			uag: string;
		};
	}

	class sbjs {
		constructor( options?: SourcebusterOptions );
		get: () => SourcebusterParams;
	}

	interface Window {
		sbjs: sbjs;
	}
}
