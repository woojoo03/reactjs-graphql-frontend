/** Firebase 관련 세팅 **/

// export const FIREBASE_API = {
// 	apiKey: process.env.FIREBASE_API_KEY,
// 	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// 	databaseURL: process.env.FIREBASE_DATABASE_URL,
// 	projectId: process.env.FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.FIREBASE_APPID,
// 	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

/** Language 관련 세팅 **/

export const allLangs = [
	{
		label: 'English',
		value: 'en',
		icon: '/assets/icons/flags/ic_flag_en.svg',
	},
	{
		label: 'French',
		value: 'fr',
		icon: '/assets/icons/flags/ic_flag_fr.svg',
	},
	{
		label: 'Vietnamese',
		value: 'vn',
		icon: '/assets/icons/flags/ic_flag_vn.svg',
	},
	{
		label: 'Chinese',
		value: 'cn',
		icon: '/assets/icons/flags/ic_flag_cn.svg',
	},
	{
		label: 'Arabic (Sudan)',
		value: 'ar',
		icon: '/assets/icons/flags/ic_flag_sa.svg',
	},
];

export const defaultLang = allLangs[0]; // English

/** Cookie 관련 세팅 **/

export const cookiesExpires = 3;

export const cookiesKey = {
	theme: 'theme',
	locale: 'locale',
};

export type ThemeMode = 'light' | 'dark';
export type CookieValueProps = {
	theme: ThemeMode;
	locale: string;
};

export const defaultCookieSettings: CookieValueProps = {
	theme: 'light',
	locale: 'en-US',
};
