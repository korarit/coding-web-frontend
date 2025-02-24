import {GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { googleConfig, facebookConfig, azureConfig, githubConfig } from "@/utils/auth/native/config";

import { Preferences } from '@capacitor/preferences';

type provider = ("google" | "facebook" | "azure-ad" | "github" | "credentials" | "register");

interface credentialsPayload {
    turnstile_token: string|null;
    type: string;
    username: string;
    password: string;
}

const token= ref<string|null>(null);
const data= ref<any|null>(null);
const status= ref<("authenticated"|"loading"|"unauthenticated")>("loading");
const providerSave= ref<(null | "google" | "facebook" | "azure-ad" | "github"| "credentials")>(null);

export const NativeAuth = async () => {



    const removeByKey = async (key: string) => {
        try {
            await Preferences.remove({ key: key });
        } catch (error) {
            console.error('Error removing key:', error);
        }
    }

    const setSessionToken = async (sessionToken: string) => {
        try{
            await Preferences.set({ key: 'sessionToken', value: sessionToken });

            token.value = sessionToken;
        } catch (error) {
            console.error('Error setting session token:', error);
        }
    }

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
    }

    

    const BackendSSOLogin = async (provider: ("google" | "facebook" | "azure-ad" | "github"), access_token: string) => {
        try {
            const data_session = await fetch(`${useRuntimeConfig().public.backendApi}/auth/oauth/login`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ provider: provider.toLowerCase(), provider_token: access_token})
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
    }


    const getSession = async () => {
        try {

            if (!token.value) {
                status.value = "unauthenticated";
                data.value = null;
                return null;
            }

            const query_session = await fetch(`${useRuntimeConfig().public.backendApi}/auth/session`, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token.value}`
                }
            });

            if (query_session.status >= 200 && query_session.status < 300) {
                const data_session = await query_session.json();
                const payload = {
                    ...data_session,
                    sessionToken: token,
                };

                data.value = payload
                status.value = "authenticated";

                return payload
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
    }


    const onload = async () => {
        await getSessionToken();
        if (token.value) {
            await getSession();
        }
    }
    // call onload
    await onload();

    const GoogleLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(googleConfig);

            const response =  await GenericOAuth2.authenticate(googleConfig);

            // get response type
            console.log(typeof response);

            providerSave.value = "google";
            const google_token = response.access_token;

            await BackendSSOLogin("google", google_token);
            if (token.value) {
                getSession();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const FacebookLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(facebookConfig);

            const response =  await GenericOAuth2.authenticate(facebookConfig);
            
            providerSave.value = "facebook";
            
            const fb_token = response['access_token']
            await BackendSSOLogin("facebook", fb_token);
            if (token.value) {
                getSession();
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const AzureLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(azureConfig);

            const response =  await GenericOAuth2.authenticate(azureConfig);

            providerSave.value = "azure-ad"

            const azure_token = response['access_token']
            await BackendSSOLogin("azure-ad", azure_token);
            if (token.value) {
                getSession();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const GithubLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(githubConfig);

            const response =  await GenericOAuth2.authenticate(githubConfig);

            providerSave.value = "github";

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const signIn = async (provider: provider, credentials?: any) => {
        switch (provider) {
            case "google":
                return await GoogleLogin();
            case "facebook":
                return await FacebookLogin();
            case "azure-ad":
                return await AzureLogin();
            case "github":
                return await GithubLogin();
            case "credentials":
                return;
            case "register":
                return;
        }
    }


    const signOut = async () => {
        token.value = null;
        data.value = null;
        status.value = "unauthenticated";

        await removeByKey('sessionToken');

        switch (providerSave.value) {
            case "google":
                GenericOAuth2.logout(googleConfig);
                break;
            case "facebook":
                GenericOAuth2.logout(facebookConfig);
                break;
            case "azure-ad":
                GenericOAuth2.logout(azureConfig);
                break;
            case "github":
                GenericOAuth2.logout(githubConfig);
                break;
            case "credentials":
                break;
        }
    }

    return {
        signIn,
        signOut,
        getSession,
        status,
        data,
        token
    }
}