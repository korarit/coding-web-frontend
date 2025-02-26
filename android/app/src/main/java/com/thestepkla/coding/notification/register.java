package com.thestepkla.coding.notification;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import org.json.JSONObject;

import io.ably.lib.push.LocalDevice;
import io.ably.lib.types.AblyException;
import io.ably.lib.types.ErrorInfo;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class register {

    private static final String BACKEND_API_URL = "YOUR_BACKEND_API_URL"; // เช่น "https://your-api.com"
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    private final OkHttpClient client = new OkHttpClient();

    private String getAccessToken(Context context) throws AblyException {
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
            return sharedPref.getString("sessionToken", null);
        } catch (Exception e) {
            throw AblyException.fromThrowable(e);
        }
    }
    public String registerDevice(Context context, LocalDevice device) throws AblyException {
        String token = getAccessToken(context);
        String url = BACKEND_API_URL + "/notification/reg";

        if(token == null){
            Log.i("unregisterDevice", "token is null");
            return null;
        }

        try {
            // สร้าง JSON body
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("ably_id", device.id);
            jsonBody.put("form_factor", device.formFactor);
            jsonBody.put("registration_token", device.deviceIdentityToken);


            RequestBody body = RequestBody.create(jsonBody.toString(), JSON);
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .addHeader("Authorization", "Bearer " + token)
                    .build();

            try (Response response = client. newCall(request).execute()) {
                if(response.body() == null){
                    throw new RuntimeException("responseBody null");
                }
                if (!response.isSuccessful()) {
                    throw AblyException.fromErrorInfo(new ErrorInfo("Registration failed: " + response.body().string(), response.code()));
                }

                String responseBody = response.body().string();
                JSONObject jsonResponse = new JSONObject(responseBody);
                return jsonResponse.optString("deviceIdentityToken", device.deviceIdentityToken); // ปรับตามโครงสร้าง response
            }
        } catch (Exception e) {
            Log.e("unregisterDevice", "error  REGISTER device", e);
            throw new RuntimeException(e);
        }
    }

    public boolean unregisterDevice(Context context) throws AblyException {
        String token = getAccessToken(context);
        String url = BACKEND_API_URL + "/notification";

        try {
            Request request = new Request.Builder()
                    .url(url)
                    .delete()
                    .addHeader("Content-Type", "application/json")
                    .addHeader("Authorization", "Bearer " + token)
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if(response.body() == null){
                    throw AblyException.fromErrorInfo(new ErrorInfo("Body is Null",response.code()));
                }
                if (!response.isSuccessful()) {
                    throw AblyException.fromErrorInfo(new ErrorInfo("Deregistration failed: " + response.body().string(), response.code()));
                }

                return true;
            }

        } catch (Exception e) {
            Log.e("unregisterDevice", "error Delete REGISTER device", e);
            return false;
        }
    }
}
