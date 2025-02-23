import { Capacitor } from "@capacitor/core"
import { NativeAuth } from "@/utils/auth/native/NativeAuth"

export const useNativeAuth = () => {

    if (Capacitor.isNativePlatform()) {
        return NativeAuth();
    } else {
        return useAuth();
    }
}