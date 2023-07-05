import Cookies from 'js-cookie';
import { ReactNode, createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { cookiesExpires, cookiesKey, CookieValueProps } from '@/config';

// ----------------------------------------------------------------------

/** UserProvider - 전역 유저 정보 관리 **/

type UserContextProps = {
	id: string;
	nickname: string;
	role: string;
	level: number;
	accessToken: string;
	refreshToken: string;
	// Actions
	onUpdate?: () => void;
};

const UserContext = createContext<UserContextProps>({
	id: '',
	nickname: 'Guest',
	role: 'User',
	level: 0,
	accessToken: '',
	refreshToken: '',
	// Actions
	onUpdate: () => {},
});

type UsersProviderProps = {
	children: ReactNode;
};

function UserProvider({ children }: UsersProviderProps) {
	const [user, setUsers] = useState({
		id: '',
		nickname: 'Guest',
		role: 'User',
		level: 0,
		accessToken: '',
		refreshToken: '',
	});

	const onUpdate = () => {
		setUsers({
			...user,
		});
	};

	return (
		<UserContext.Provider
			value={{
				id: user?.id ?? '',
				nickname: user?.nickname ?? '',
				role: user?.role ?? '',
				level: user?.level ?? 0,
				accessToken: user?.accessToken ?? '',
				refreshToken: user?.refreshToken ?? '',
				// Actions
				onUpdate,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

/** SettingProvider - 전역 세팅 정보 관리 **/

type SettingContextProps = {
	theme: string;
	locale: string;
	application?: {
		name: string;
		logo: string;
		url: string;
	};
	// Actions
	toggleTheme?: () => void;
};

const SettingContext = createContext<SettingContextProps>({
	theme: 'light',
	locale: 'en-US',
	application: {
		name: 'AppName',
		logo: 'logo.png',
		url: 'https://app.com',
	},
	// Actions
	toggleTheme: () => {},
});

type SettingsProviderProps = {
	children: ReactNode;
	defaultCookies: CookieValueProps;
};

function SettingProvider({ children, defaultCookies }: SettingsProviderProps) {
	const [setting, setSetting] = useSettingCookies(defaultCookies);

	const toggleTheme = () => {
		setSetting({
			...setting,
			theme: setting.theme === 'light' ? 'dark' : 'light',
		});
	};

	return (
		<SettingContext.Provider
			value={{
				theme: setting.theme ?? 'light',
				locale: setting.locale ?? 'en-US',
				// Actions
				toggleTheme,
			}}
		>
			{children}
		</SettingContext.Provider>
	);
}

export { UserProvider, UserContext, SettingProvider, SettingContext };

// ----------------------------------------------------------------------

/** Setting 값 변경시 마다 Cookie 업데이트 **/

function useSettingCookies(
	defaultSettings: CookieValueProps,
): [CookieValueProps, Dispatch<SetStateAction<CookieValueProps>>] {
	const [settings, setSettings] = useState<CookieValueProps>(defaultSettings);

	const onChangeSetting = () => {
		Cookies.set(cookiesKey.theme, settings.theme, { expires: cookiesExpires });
		Cookies.set(cookiesKey.locale, settings.locale, { expires: cookiesExpires });
	};

	useEffect(() => {
		onChangeSetting();
	}, [settings]);

	return [settings, setSettings];
}
