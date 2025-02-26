package com.thestepkla.coding;

import android.content.Context;
import android.content.SharedPreferences;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import io.ably.lib.realtime.AblyRealtime;
import io.ably.lib.types.AblyException;
import io.ably.lib.types.ClientOptions;

@CapacitorPlugin(name = "Notification")
public class NotificationPlugin extends Plugin {
    private AblyRealtime ablyRealtime;

    // ดึง sessionToken จาก SharedPreferences
    private String getAccessToken(Context context) {
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
            return sharedPref.getString("sessionToken", null);
        } catch (Exception e) {
            throw new RuntimeException("Error getting token: " + e.getMessage());
        }
    }

    // เริ่มต้น AblyRealtime
    private void initializeAbly(Context context) throws AblyException {
        if (ablyRealtime == null) {
            ClientOptions options = new ClientOptions("YOUR_ABLY_API_KEY");
            ablyRealtime = new AblyRealtime(options);
            ablyRealtime.setAndroidContext(context);
        }
    }

    @PluginMethod()
    public void registerDevice(PluginCall call) {
        Context context = getContext();
        String token = getAccessToken(context);

        if (token == null) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message","No access token found. Please login first.");
            call.resolve(result);
            return;
        }

        try {
            initializeAbly(context);
            // เปิดใช้งาน push notifications
            if (ablyRealtime != null) {
                ablyRealtime.push.activate();
            }

            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
        } catch (AblyException e) {
            call.reject("Failed to register device: " + e.getMessage());
        }
    }

    @PluginMethod()
    public void unregisterDevice(PluginCall call) {
        Context context = getContext();
        String token = getAccessToken(context);

        if (token == null) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message","No access token found. Please login first.");
            call.resolve(result);
            return;
        }

        try {
            initializeAbly(context);

            // ปิด push และ Ably
            if (ablyRealtime != null) {
                ablyRealtime.push.deactivate();
            }

            JSObject result = new JSObject();
            result.put("success", true);
            result.put("message","un register device success");

            call.resolve(result);
        } catch (AblyException e) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message","un register device fail :" + e.getMessage());

            call.resolve(result);
        }
    }
}