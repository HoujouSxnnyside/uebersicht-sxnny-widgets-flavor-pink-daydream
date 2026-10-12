// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "MacWidgetsNative",
    platforms: [
        .macOS(.v14)
    ],
    products: [
        .executable(name: "weather-cli", targets: ["WeatherCLI"]),
        .executable(name: "calendar-cli", targets: ["CalendarCLI"]),
        .executable(name: "system-cli", targets: ["SystemCLI"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "NativeBridgeCore",
            path: "Sources/Core"
        ),
        .executableTarget(
            name: "WeatherCLI",
            dependencies: ["NativeBridgeCore"],
            path: "Sources/CLI/Weather"
        ),
        .executableTarget(
            name: "CalendarCLI",
            dependencies: ["NativeBridgeCore"],
            path: "Sources/CLI/Calendar"
        ),
        .executableTarget(
            name: "SystemCLI",
            dependencies: ["NativeBridgeCore"],
            path: "Sources/CLI/System"
        ),
        .testTarget(
            name: "NativeBridgeTests",
            dependencies: ["NativeBridgeCore"],
            path: "Tests/NativeBridgeTests"
        ),
    ]
)
