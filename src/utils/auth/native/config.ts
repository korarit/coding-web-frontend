import {type OAuth2AuthenticateOptions } from "@capacitor-community/generic-oauth2";

const config = useRuntimeConfig()

export const facebookConfig : OAuth2AuthenticateOptions = {
    appId: config.public.clientFacebookId, // client id from facebook dev console
    authorizationBaseUrl: "https://www.facebook.com/v11.0/dialog/oauth?scope=email",
    accessTokenEndpoint: "https://graph.facebook.com/oauth/access_token",
    resourceUrl: "https://graph.facebook.com/me?fields=id,name,email,picture",
    web: {
      responseType: "token",
      redirectUrl: "http://localhost:3000",
      windowOptions: "height=600,left=0,top=0"
    },
    android: {
      customHandlerClass: "com.thestepkla.coding.YourAndroidFacebookOAuth2Handler",
    }
};

export const azureConfig : OAuth2AuthenticateOptions = {
  appId: config.public.clientAzureId, // client id from azure dev console
  authorizationBaseUrl: `https://login.microsoftonline.com/${config.public.clientAzureTenantId}/oauth2/v2.0/authorize`,
  scope: 'openid profile email', // See Azure Portal -> API permission
  accessTokenEndpoint: `https://login.microsoftonline.com/${config.public.clientAzureTenantId}/oauth2/v2.0/token`,
  resourceUrl: 'https://graph.microsoft.com/v1.0/me/',
  responseType: 'code',
  pkceEnabled: false,
  logsEnabled: true,
  android: {
    redirectUrl: config.public.AzureRedirectUri, // See Azure Portal -> Authentication -> Android Configuration "Redirect URI"
  }
};


export const googleConfig : OAuth2AuthenticateOptions = {
  authorizationBaseUrl: "https://accounts.google.com/o/oauth2/auth",
  accessTokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
  scope: "openid email profile",
  resourceUrl: "https://www.googleapis.com/userinfo/v2/me",
  // web: {
  //   appId: config.public.clientGoogleId, // client id from google dev console
  //   responseType: "token", // implicit flow
  //   accessTokenEndpoint: "", // clear the tokenEndpoint as we know that implicit flow gets the accessToken from the authorizationRequest
  //   redirectUrl: "http://localhost:3000",
  //   windowOptions: "height=600,left=0,top=0"
  // },
  android: {
    appId: config.public.clientGoogleAndroidId, // client id from google dev console
    responseType: "code", // if you configured a android app in google dev console the value must be "code"
    redirectUrl: "com.thestepkla.coding:/" // package name from google dev console
  }
};


export const githubConfig : OAuth2AuthenticateOptions = {
  appId: config.public.clientGithubId, // client id from github dev console
  authorizationBaseUrl: "https://github.com/login/oauth/authorize",
  scope: "read:user user:email",
  responseType: "code",
  pkceEnabled: true,
  logsEnabled: true,
  android: {
    redirectUrl: "githubauth://com.thestepkla.coding:/",
  },
  ios: {
    redirectUrl: "githubauth://com.thestepkla.coding:/",
  }
}