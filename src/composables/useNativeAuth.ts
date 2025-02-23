import {GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { googleConfig, facebookConfig, azureConfig, githubConfig } from "../utils/auth/native/config";


type provider = ("google" | "facebook" | "azure-ad" | "github" | "credentials");

export const useNativeAuth = () => {

    const token = ref<string|null>(null);
    const data = ref<any|null>(null);
    const status = ref<("authenticated"|"loading"|"unauthenticated")>("unauthenticated");
    const providerSave = ref<(null | "google" | "facebook" | "azure-ad" | "github"| "credentials")>(null);

    const BackendSSOLogin = async (provider: ("google" | "facebook" | "azure-ad" | "github"), access_token: string) => {
        const data_session = await fetch(`${useRuntimeConfig().apiBase}/auth/oauth/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ provider: provider.toLowerCase(), provider_token: access_token})
        });

        if (data_session.status >= 200 && data_session.status < 300) {
            const data = await data_session.json();
            console.log('OAuth login successful:', data);
            token.value = data.login_token;
        } else {
            console.error('OAuth login failed:', await data_session.json());
            return null;
        }
    }


    const getSession = async () => {
        try {
            const query_session = await fetch(`${useRuntimeConfig().apiBase}/auth/session`, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
            });

            if (query_session.status >= 200 && query_session.status < 300) {
                const data_session = await query_session.json();
                const payload = {
                    ...data_session,
                    sessionToken: token,
                };
                data.value = payload
                return payload
            } else {
                console.error('Session fetch failed:', query_session.statusText);
                data.value = null;
                return null;
            }
        } catch (error) {
            console.error('Error during session fetch:', error);
            data.value = null;
            return null;
        }
    }
    
    const GoogleLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(googleConfig);

            const response =  await GenericOAuth2.authenticate(googleConfig);
            providerSave.value = "google";
            const google_token = response['access_token']
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

    const NativeLogin = async (provider: provider, credentials?: {username:string;password:string}) => {
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
        }
    }


    const signOut = () => {
        token.value = null;
        data.value = null;
        status.value = "unauthenticated";

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
        NativeLogin,
        signOut,
        getSession,
        status,
        data,
    }
}