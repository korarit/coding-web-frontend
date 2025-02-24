import { Capacitor } from "@capacitor/core"
import { NativeAuth } from "@/utils/auth/native/NativeAuth"

export const useNativeAuth = async () => {

    if (Capacitor.isNativePlatform()) {
        return await NativeAuth();
    } else {
        return useAuth();
    }
}