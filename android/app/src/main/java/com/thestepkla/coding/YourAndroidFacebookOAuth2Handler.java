package com.thestepkla.coding;

import android.app.Activity;
import com.thestepkla.coding.MainActivity;
import com.facebook.AccessToken;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.DefaultAudience;
import com.facebook.login.LoginBehavior;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.getcapacitor.PluginCall;
import com.getcapacitor.community.genericoauth2.handler.AccessTokenCallback;
import com.getcapacitor.community.genericoauth2.handler.OAuth2CustomHandler;
import java.util.Collections;

public class YourAndroidFacebookOAuth2Handler implements OAuth2CustomHandler {

  @Override
  public void getAccessToken(
    Activity activity,
    PluginCall pluginCall,
    final AccessTokenCallback callback
  ) {
    AccessToken accessToken = AccessToken.getCurrentAccessToken();
    if (AccessToken.isCurrentAccessTokenActive()) {
      callback.onSuccess(accessToken.getToken());
    } else {
      LoginManager l = LoginManager.getInstance();
      l.logInWithReadPermissions(
        activity,
        Collections.singletonList("public_profile")
      );
      l.setLoginBehavior(LoginBehavior.WEB_ONLY);
      l.setDefaultAudience(DefaultAudience.NONE);
      LoginManager
        .getInstance()
        .registerCallback(
          ((MainActivity) activity).getCallbackManager(),
          new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
              callback.onSuccess(loginResult.getAccessToken().getToken());
            }

            @Override
            public void onCancel() {
              callback.onCancel();
            }

            @Override
            public void onError(FacebookException error) {
              callback.onCancel();
            }
          }
        );
    }
  }

  @Override
  public boolean logout(Activity activity, PluginCall pluginCall) {
    LoginManager.getInstance().logOut();
    return true;
  }
}
