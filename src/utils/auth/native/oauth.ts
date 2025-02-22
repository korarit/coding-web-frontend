import {GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { googleConfig, facebookConfig, azureConfig, githubConfig } from "./config";



export async function GoogleLogin() {
    try {
        const response =  await GenericOAuth2.authenticate(googleConfig);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export async function FacebookLogin() {
    try {
        const response =  await GenericOAuth2.authenticate(facebookConfig);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export async function AzureLogin() {
    try {
        const response =  await GenericOAuth2.authenticate(azureConfig);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export async function GithubLogin() {
    try {
        const response =  await GenericOAuth2.authenticate(githubConfig);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}