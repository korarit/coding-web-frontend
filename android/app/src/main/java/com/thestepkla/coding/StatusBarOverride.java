package com.thestepkla.coding;

import android.app.Activity;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.graphics.Color;
import androidx.activity.ComponentActivity;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.ViewCompat;

public class StatusBarOverride {
    private final Activity activity;

    public StatusBarOverride(Activity activity) {
        this.activity = activity;
    }

    public void setStatusBarColor() {
        if (!(activity instanceof ComponentActivity)) {
            throw new IllegalArgumentException("Activity must be a ComponentActivity");
        }

        Window window = activity.getWindow();
        View decorView = window.getDecorView();

        // เปิดใช้งานโหมด edge-to-edge
        WindowCompat.setDecorFitsSystemWindows(window, false);

        // ตั้งค่าสีพื้นหลังของ Status Bar ด้วยการจัดการ WindowInsets
        ViewCompat.setOnApplyWindowInsetsListener(decorView, (view, insets) -> {
            int statusBarHeight = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top;
            // วาดสีพื้นหลังของ Status Bar
            view.setBackgroundColor(Color.BLACK); // เปลี่ยนเป็นสีที่ต้องการ
            view.setPadding(0, statusBarHeight, 0, 0); // ป้องกันเนื้อหาทับ Status Bar
            return insets;
        });

        // ตั้งค่าไอคอน Status Bar (Light/Dark)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                controller.setSystemBarsAppearance(
                        WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS,
                        WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                );
                controller.show(WindowInsets.Type.statusBars());
            }
        } else {
            decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
        }
    }
}