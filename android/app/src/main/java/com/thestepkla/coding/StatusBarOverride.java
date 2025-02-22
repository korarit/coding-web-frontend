package com.thestepkla.coding;

import android.app.Activity;
import android.os.Build;
import android.view.Window;
import android.view.View;
import android.graphics.Color;
import android.view.WindowManager;
import androidx.core.view.WindowInsetsControllerCompat;

public class StatusBarOverride {
    private final Activity activity;

    public StatusBarOverride(Activity activity) {
        this.activity = activity;
    }

    public void setStatusBarColor() {
        Window window = activity.getWindow();
        // เคลียร์ flag ที่อาจทำให้ status bar โปร่งใส
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        // เปิดให้วาด system bar backgrounds
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        // ตั้งค่าสี status bar เป็นสีดำ
        window.setStatusBarColor(Color.BLACK);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // ให้ระบบจัดการ layout ของ system bar แยกออกจากเนื้อหา
            window.setDecorFitsSystemWindows(true);

            // ใช้ WindowInsetsControllerCompat เพื่อจัดการลักษณะของ status bar
            WindowInsetsControllerCompat insetsController = new WindowInsetsControllerCompat(window, window.getDecorView());
            // ปิดการตั้งค่าที่บังคับให้ไอคอนเป็นสีเข้ม (light status bars)
            insetsController.setAppearanceLightStatusBars(false);
        } else {
            // สำหรับ Android รุ่นเก่า ให้ตั้งค่า UI visibility เป็นแบบปกติ
            window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
        }
    }
}
