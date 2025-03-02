import {GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { googleConfig, facebookConfig, azureConfig, githubConfig } from "@/utils/auth/native/config";


type provider = ("google" | "facebook" | "azure-ad" | "github" | "credentials" | "register");

const sessionToken = ref<string | null>("");

export const NativeOauthConnext = async () => {

    const BackendSSOConnect = async (provider: ("google" | "facebook" | "azure-ad" | "github"), access_token: string) => {
        try {
            const data_session = await fetch(`${useRuntimeConfig().public.backendApi}/auth/oauth/navite/connect`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken.value}`
                },
                body: JSON.stringify({ provider: provider.toLowerCase(), provider_token: access_token})
            });

            if (data_session.status >= 200 && data_session.status < 300) {
                const data = await data_session.json();
                console.log('OAuth login successful:', data);


                return true;
            } else {
                console.error('OAuth login failed:', await data_session.json());
                return false;
            }
        } catch (error) {
            console.error('Error during OAuth login:', error);
            return false;
        }
    }


    const GoogleLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(googleConfig);

            const response =  await GenericOAuth2.authenticate(googleConfig);

            // get response type
            console.log(typeof response);

            const google_token = response.access_token;

            return await BackendSSOConnect("google", google_token);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const FacebookLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(facebookConfig);

            const response =  await GenericOAuth2.authenticate(facebookConfig);
            
            console.log(response);

            const fb_token = response['access_token'];
            if (!fb_token) {
                console.error('Error during Facebook login:', response);
                return false;
            }
            return await BackendSSOConnect("facebook", fb_token);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const AzureLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(azureConfig);

            const response =  await GenericOAuth2.authenticate(azureConfig);


            const azure_token = response['access_token']
            return await BackendSSOConnect("azure-ad", azure_token);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const GithubLogin = async () => {
        try {

            // force logout
            await GenericOAuth2.logout(githubConfig);

            const response =  await GenericOAuth2.authenticate(githubConfig);
            console.log(response);
            if (!response.authorization_response) {
                console.error('Error during Github login:', response);
                return;
            }
            const get_github_token = await fetch(`${useRuntimeConfig().public.backendApi}/auth/oauth/get/access_token`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code_token: response.authorization_response.code,
                    code_verifier: response.authorization_response.codeVerifier,
                    provider: "github",
                    redirect_url: "githubauth://com.thestepkla.coding:/"
                })
            });
            if (get_github_token.status >= 200 && get_github_token.status < 300) {
                const data = await get_github_token.json();
                console.log('OAuth login successful:', data);
                return await BackendSSOConnect("github", data.access_token);
            }else{
                console.error('Error during Github login:', await get_github_token.json());
                return false;
            }

        } catch (error) {
            console.error(error);

            return false;
        }
    }

    const Connect = async (provider: provider, session: string) => {
        sessionToken.value = session;
        switch (provider) {
            case "google":
                return await GoogleLogin();
            case "facebook":
                return await FacebookLogin();
            case "azure-ad":
                return await AzureLogin();
            case "github":
                return await GithubLogin();
        }
    }


    return {
        Connect
    }
}