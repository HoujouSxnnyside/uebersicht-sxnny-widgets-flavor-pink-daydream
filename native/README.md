# Native macOS Swift Utilities

This directory hosts the Swift package (`MacWidgetsNative`) that builds high-performance command-line utilities communicating with Übersicht via structured JSON on `stdout`.

## Why Swift CLI for Übersicht?
- Direct access to macOS SDK system frameworks: `EventKit`, `IOKit`, `Darwin`, `CoreWLAN`, `DiskArbitration`.
- Execution times under 15ms and negligible memory footprint compared to heavy script runtimes.
- Guaranteed schema integrity with Swift `Codable`.

## Adding a New CLI Utility

1. Register the product and target in `native/Package.swift`:
```swift
products: [
    .executable(name: "battery-cli", targets: ["BatteryCLI"])
],
targets: [
    .executableTarget(
        name: "BatteryCLI",
        dependencies: ["NativeBridgeCore"],
        path: "Sources/CLI/Battery"
    )
]
```

2. Create the source file in `native/Sources/CLI/Battery/main.swift`:
```swift
import Foundation
import NativeBridgeCore

struct BatteryStatus: Codable {
    let percentage: Int
    let isCharging: Bool
}

let status = BatteryStatus(percentage: 85, isCharging: true)
NativeOutput.printJSON(status)
```

3. Build with Bun / Just:
```bash
just build-swift
```
Compiled binaries are emitted to `native/.build/release/` and copied to `dist/bin/`.
