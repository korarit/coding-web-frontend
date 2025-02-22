package com.thestepkla.coding;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.CallbackManager;

import com.thestepkla.coding.StatusBarOverride;


public class MainActivity extends BridgeActivity {

    private CallbackManager callbackManager;
    private StatusBarOverride BarOverride = new StatusBarOverride(this);
  
    @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      // Initialize Facebook SDK
      FacebookSdk.sdkInitialize(this.getApplicationContext());
      callbackManager = CallbackManager.Factory.create();
      BarOverride.setStatusBarColor();
    }
  
    @Override
    protected void onActivityResult(
      int requestCode,
      int resultCode,
      Intent data
    ) {
      super.onActivityResult(requestCode, resultCode, data);
      if (callbackManager.onActivityResult(requestCode, resultCode, data)) {
        return;
      }
    }

    public CallbackManager getCallbackManager() {
      return callbackManager;
    }
  }
  