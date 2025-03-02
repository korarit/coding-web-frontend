import { ref, onMounted } from 'vue';
import { GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { googleConfig, facebookConfig, azureConfig, githubConfig } from "@/utils/auth/native/config";
import { Preferences } from '@capacitor/preferences';

type provider = ("google" | "facebook" | "azure-ad" | "github" | "credentials" | "register");

interface credentialsPayload {
    turnstile_token: string | null;
    type: string;
    username: string;
    password: string;
}

interface registerPayload {
    email: string;
    password: string;
    otp: string;
    otp_code: string;
}

const token = useState<string | null>('auth_token', () => null);
const data = useState<any | null>('auth_data', () => null);
const status = useState<"authenticated" | "loading" | "unauthenticated">('auth_status', () => "loading");
const providerSave = useState<null | "google" | "facebook" | "azure-ad" | "github" | "credentials">('auth_provider', () => null);

export const NativeAuth = () => {

    const removeByKey = async (key: string) => {
        try {
            await Preferences.remove({ key });
        } catch (error) {
            console.error('Error removing key:', error);
        }
    };

    const setSessionToken = async (sessionToken: string) => {
        try {
            await Preferences.set({ key: 'sessionToken', value: sessionToken });
            token.value = sessionToken;
        } catch (error) {
            console.error('Error setting session token:', error);
        }
    };

    const getSessionToken = async () => {
        try {
            const sessionToken = await Preferences.get({ key: 'sessionToken' });
            if (sessionToken.value) {
                status.value = "authenticated";
                token.value = sessionToken.value;
            } else {
                status.value = "unauthenticated";
                token.value = null;
            }
        } catch (error) {
            token.value = null;
            console.error('Error getting session token:', error);
        }
    };

    const BackendSSOLogin = async (provider: "google" | "facebook" | "azure-ad" | "github", access_token: string) => {
        try {
            const data_session = await fetch(`${useRuntimeConfig().public.backendApi}/auth/oauth/login/native`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ provider: provider.toLowerCase(), provider_token: access_token })
            });

            if (data_session.status >= 200 && data_session.status < 300) {
                const data = await data_session.json();
                console.log('OAuth login successful:', data);
                await setSessionToken(data.login_token);
                return data;
            } else {
                status.value = "unauthenticated";
                console.error('OAuth login failed:', await data_session.json());
                return null;
            }
        } catch (error) {
            console.error('Error during OAuth login:', error);
            return null;
        }
    };

    const getSession = async () => {
        try {
            if (!token.value) {
                status.value = "unauthenticated";
                data.value = null;
                return null;
            }

            status.value = "loading";

            const query_session = await fetch(`${useRuntimeConfig().public.backendApi}/auth/session`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.value}`
                }
            });

            if (query_session.status >= 200 && query_session.status < 300) {
                const data_session = await query_session.json();
                const payload = { ...data_session, sessionToken: token.value };
                data.value = payload;
                status.value = "authenticated";
                return payload;
            } else {
                console.error('Session fetch failed:', query_session.statusText);
                status.value = "unauthenticated";
                data.value = null;
                return null;
            }
        } catch (error) {
            console.error('Error during session fetch:', error);
            status.value = "unauthenticated";
            data.value = null;
            return null;
        }
    };

    const registerDeviceForNotifications = async () => {
        const deviceToken = await Preferences.get({ key: 'ably-device-token' });
        if (!deviceToken.value) {
            console.error('Device token not found');
            return;
        }

        const body = JSON.stringify({ registration_token: deviceToken.value });
        console.log('Device registration body:', body);

        const response = await fetch(`${useRuntimeConfig().public.backendApi}/notification/reg/fcm`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            },
            body
        });

        if (response.status >= 200 && response.status < 300) {
            console.log('Device registration successful:', await response.json());
        } else {
            console.error('Device registration failed:', await response.json());
        }
    };

    const UnRegisterDeviceForNotifications = async () => {
        const response = await fetch(`${useRuntimeConfig().public.backendApi}/notification`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });

        if (response.status >= 200 && response.status < 300) {
            console.log('Device unregistration successful:', await response.json());
        } else {
            console.error('Device unregistration failed:', await response.json());
        }
    };

    const GoogleLogin = async () => {
        try {
            await GenericOAuth2.logout(googleConfig);
            const response = await GenericOAuth2.authenticate(googleConfig);
            providerSave.value = "google";
            const google_token = response.access_token;
            await BackendSSOLogin("google", google_token);
            if (token.value) {
                await getSession();
                await registerDeviceForNotifications();
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const FacebookLogin = async () => {
        try {
            await GenericOAuth2.logout(facebookConfig);
            const response = await GenericOAuth2.authenticate(facebookConfig);
            providerSave.value = "facebook";
            const fb_token = response['access_token'];
            await BackendSSOLogin("facebook", fb_token);
            if (token.value) {
                await getSession();
                await registerDeviceForNotifications();
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const AzureLogin = async () => {
        try {
            await GenericOAuth2.logout(azureConfig);
            const response = await GenericOAuth2.authenticate(azureConfig);
            providerSave.value = "azure-ad";
            const azure_token = response['access_token'];
            await BackendSSOLogin("azure-ad", azure_token);
            if (token.value) {
                await getSession();
                await registerDeviceForNotifications();
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const GithubLogin = async () => {
        try {
            await GenericOAuth2.logout(githubConfig);
            const response = await GenericOAuth2.authenticate(githubConfig);
            if (!response.authorization_response) {
                console.error('Error during Github login:', response);
                return;
            }
            const get_github_token = await fetch(`${useRuntimeConfig().public.backendApi}/auth/oauth/get/access_token`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code_token: response.authorization_response.code,
                    code_verifier: response.authorization_response.codeVerifier,
                    provider: "github",
                    redirect_url: githubConfig.android?.redirectUrl
                })
            });
            if (get_github_token.status >= 200 && get_github_token.status < 300) {
                const data = await get_github_token.json();
                await BackendSSOLogin("github", data.access_token);
                if (token.value) {
                    await getSession();
                    await registerDeviceForNotifications();
                    window.location.reload();
                }
            } else {
                console.error('Error during Github login:', await get_github_token.json());
            }
        } catch (error) {
            console.error(error);
        }
    };

    const CredentialsLogin = async (credentials: credentialsPayload) => {
        if (!credentials.turnstile_token) {
            console.error('Turnstile token not found');
            return;
        }
        try {
            const data_session = await fetch(`${useRuntimeConfig().public.backendApi}/auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Turnstile-Token": credentials.turnstile_token },
                body: JSON.stringify({
                    type: credentials.type,
                    username: credentials.username,
                    password: credentials.password
                })
            });

            if (data_session.status >= 200 && data_session.status < 300) {
                const data = await data_session.json();
                console.log('Credentials login successful:', data);
                await setSessionToken(data.login_token);
                if (token.value) {
                    await getSession();
                    await registerDeviceForNotifications();
                    window.location.reload();
                }
            } else {
                status.value = "unauthenticated";
                console.error('Credentials login failed:', await data_session.json());
            }
        } catch (error) {
            console.error('Error during credentials login:', error);
        }
    };

    const RegisterLogin = async (credentials: registerPayload) => {
        try {
            const data_session = await fetch(`${useRuntimeConfig().public.backendApi}/auth/register/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                    otp: credentials.otp,
                    otp_code: credentials.otp_code
                })
            });

            if (data_session.status >= 200 && data_session.status < 300) {
                const data = await data_session.json();
                console.log('Register successful:', data);
                await setSessionToken(data.login_token);
                if (token.value) {
                    await getSession();
                    await registerDeviceForNotifications();
                    window.location.reload();
                }
            } else {
                status.value = "unauthenticated";
                console.error('Register failed:', await data_session.json());
            }
        } catch (error) {
            console.error('Error during register:', error);
        }
    };

    const signIn = async (provider: provider, credentials?: any) => {
        switch (provider) {
            case "google": return await GoogleLogin();
            case "facebook": return await FacebookLogin();
            case "azure-ad": return await AzureLogin();
            case "github": return await GithubLogin();
            case "credentials": return await CredentialsLogin(credentials);
            case "register": return await RegisterLogin(credentials);
        }
    };

    const signOut = async () => {
        await UnRegisterDeviceForNotifications();
        token.value = null;
        data.value = null;
        status.value = "unauthenticated";
        await removeByKey('sessionToken');

        switch (providerSave.value) {
            case "google": await GenericOAuth2.logout(googleConfig); break;
            case "facebook": await GenericOAuth2.logout(facebookConfig); break;
            case "azure-ad": await GenericOAuth2.logout(azureConfig); break;
            case "github": await GenericOAuth2.logout(githubConfig); break;
            case "credentials": break;
        }
        window.location.reload();
    };

    // ใช้ onMounted แทนการเรียก onload ทันที
    onMounted(async () => {
        await getSessionToken();
        if (token.value) {
            await getSession();
        }
    });

    return {
        signIn,
        signOut,
        getSession,
        getSessionToken,
        status,
        data,
        token
    };
};