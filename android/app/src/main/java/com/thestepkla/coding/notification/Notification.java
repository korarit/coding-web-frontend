package com.thestepkla.coding.notification;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import io.ably.lib.push.LocalDevice;
import io.ably.lib.realtime.AblyRealtime;
import io.ably.lib.types.AblyException;
import io.ably.lib.types.ErrorInfo;
import io.ably.lib.util.IntentUtils;


public class Notification extends BroadcastReceiver {
    private static final String ABLY_CLIENT_KEY = "D";
    private final register registerClient = new register();

    private void handleDeviceRegistration(Context context, AblyRealtime ably) {
        Intent response = new Intent("io.ably.broadcast.PUSH_DEVICE_REGISTERED");
        try {
            LocalDevice device = ably.device();
            String deviceIdentityToken = registerClient.registerDevice(context, device);
            if (deviceIdentityToken == null){
                return;
            }

        } catch (AblyException e) {
            IntentUtils.addErrorInfo(response, e.errorInfo);
        }

        LocalBroadcastManager.getInstance(context.getApplicationContext()).sendBroadcast(response);
    }

    private void handleDeviceDeregistration(Context context) {
        Intent response = new Intent("io.ably.broadcast.PUSH_DEVICE_DEREGISTERED");
        try {
            boolean success = registerClient.unregisterDevice(context);
            if (!success) {
                throw AblyException.fromErrorInfo(new ErrorInfo("Failed to deregister device with server", 500));
            }

        } catch (AblyException e) {
            IntentUtils.addErrorInfo(response, e.errorInfo);
        }

        LocalBroadcastManager.getInstance(context.getApplicationContext()).sendBroadcast(response);
    }

    private AblyRealtime getAblyRealtime(Context context) throws AblyException {
        AblyRealtime ably = new AblyRealtime(ABLY_CLIENT_KEY);
        ably.setAndroidContext(context);
        return ably; // แทนที่ด้วย API Key ของคุณ
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            String action = intent.getAction();
            if ("io.ably.broadcast.PUSH_REGISTER_DEVICE".equals(action)) {
                AblyRealtime ably = getAblyRealtime(context);
                handleDeviceRegistration(context, ably);

            } else if ("io.ably.broadcast.PUSH_DEREGISTER_DEVICE".equals(action)) {
                handleDeviceDeregistration(context);
            }
        } catch (Exception e){
            Log.e("onReceive", "error REGISTER", e);
        }
    }
}