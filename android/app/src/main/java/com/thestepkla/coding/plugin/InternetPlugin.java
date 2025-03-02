package com.thestepkla.coding.plugin;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;

@CapacitorPlugin(name = "InternetCheck")
public class InternetPlugin extends Plugin {
    private ConnectivityManager connectivityManager;
    private NetworkCallback networkCallback;

    @Override
    public void load() {
        connectivityManager = (ConnectivityManager) getContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        setupNetworkListener();
    }

    private boolean hasInternet() {
        Network activeNetwork = connectivityManager.getActiveNetwork();
        if (activeNetwork == null) return false;

        NetworkCapabilities capabilities =
                connectivityManager.getNetworkCapabilities(activeNetwork);
        if (capabilities == null) return false;

        // ตรวจสอบทั้งการเชื่อมต่อและความสามารถในการเข้าถึงอินเทอร์เน็ต
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED) &&
                (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) ||
                        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
                        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET));
    }

    private void setupNetworkListener() {
        networkCallback = new NetworkCallback();

        NetworkRequest networkRequest = new NetworkRequest.Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .addCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
                .build();

        connectivityManager.registerNetworkCallback(networkRequest, networkCallback);
    }

    private class NetworkCallback extends ConnectivityManager.NetworkCallback {
        @Override
        public void onAvailable(Network network) {
            // ตรวจสอบการ validate เพิ่มเติม
            NetworkCapabilities caps = connectivityManager.getNetworkCapabilities(network);
            boolean isValidated = caps != null &&
                    caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);
            notifyConnectionStatus(isValidated);
        }

        @Override
        public void onLost(Network network) {
            notifyConnectionStatus(false);
        }

        @Override
        public void onCapabilitiesChanged(Network network, NetworkCapabilities networkCapabilities) {
            boolean isConnected = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                    networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);
            notifyConnectionStatus(isConnected);
        }
    }

    private void notifyConnectionStatus(boolean isConnected) {
        JSObject ret = new JSObject();
        ret.put("value", isConnected);
        notifyListeners("InternetConnectionChanged", ret);
    }

    @PluginMethod()
    public void check(PluginCall call) {
        Boolean value = this.hasInternet();
        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }

    @Override
    protected void handleOnDestroy() {
        if (connectivityManager != null && networkCallback != null) {
            connectivityManager.unregisterNetworkCallback(networkCallback);
        }
    }
}