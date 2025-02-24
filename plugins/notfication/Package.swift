// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "AblyNotification",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "AblyNotification",
            targets: ["AlertNotificationPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "AlertNotificationPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/AlertNotificationPlugin"),
        .testTarget(
            name: "AlertNotificationPluginTests",
            dependencies: ["AlertNotificationPlugin"],
            path: "ios/Tests/AlertNotificationPluginTests")
    ]
)