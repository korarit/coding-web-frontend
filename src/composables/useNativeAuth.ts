import {GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { googleConfig, facebookConfig, azureConfig, githubConfig } from "../utils/auth/native/config";


export const useNativeAuth = () => {
    
    const GoogleLogin = async () => {
        try {
            const response =  await GenericOAuth2.authenticate(googleConfig);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const FacebookLogin = async () => {
        try {
            const response =  await GenericOAuth2.authenticate(facebookConfig);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const AzureLogin = async () => {
        try {
            const response =  await GenericOAuth2.authenticate(azureConfig);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const GithubLogin = async () => {
        try {
            const response =  await GenericOAuth2.authenticate(githubConfig);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const NativeLogin = async (provider: ("google" | "facebook" | "azure-ad" | "github")) => {
        switch (provider) {
            case "google":
                return await GoogleLogin();
            case "facebook":
                return await FacebookLogin();
            case "azure-ad":
                return await AzureLogin();
            case "github":
                return await GithubLogin();
            default:
                return;
        }
    }

    return {
        NativeLogin
    }
}