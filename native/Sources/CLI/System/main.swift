import Darwin
import Foundation
import IOKit.ps
import NativeBridgeCore

struct SystemMetricsResponse: Codable, Sendable {
    let cpuPercent: Double
    let memoryPercent: Double
    let memoryUsedGB: Double
    let memoryTotalGB: Double
    let diskPercent: Double
    let diskUsedGB: Double
    let diskTotalGB: Double
    let hasBattery: Bool
    let batteryPercent: Int
    let isCharging: Bool
    let isPluggedIn: Bool
}

@main
struct SystemCLI {
    static func main() {
        let cpu = measureCPU()
        let mem = measureMemory()
        let disk = measureDisk()
        let bat = measureBattery()

        let response = SystemMetricsResponse(
            cpuPercent: cpu,
            memoryPercent: mem.percent,
            memoryUsedGB: mem.usedGB,
            memoryTotalGB: mem.totalGB,
            diskPercent: disk.percent,
            diskUsedGB: disk.usedGB,
            diskTotalGB: disk.totalGB,
            hasBattery: bat.hasBattery,
            batteryPercent: bat.percent,
            isCharging: bat.isCharging,
            isPluggedIn: bat.isPluggedIn
        )

        NativeOutput.printJSON(response)
    }

    // 1. CPU Load
    private static func getCPUTicks() -> (user: UInt32, system: UInt32, idle: UInt32, nice: UInt32)? {
        var load = host_cpu_load_info()
        var count = mach_msg_type_number_t(MemoryLayout<host_cpu_load_info_data_t>.size / MemoryLayout<integer_t>.size)
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &load) {
            $0.withMemoryRebound(to: integer_t.self, capacity: Int(count)) {
                host_statistics(mach_host_self(), HOST_CPU_LOAD_INFO, $0, &count)
            }
        }
        if kerr == KERN_SUCCESS {
            return (
                user: UInt32(load.cpu_ticks.0),
                system: UInt32(load.cpu_ticks.1),
                idle: UInt32(load.cpu_ticks.2),
                nice: UInt32(load.cpu_ticks.3)
            )
        }
        return nil
    }

    private static func measureCPU() -> Double {
        guard let s1 = getCPUTicks() else { return 0.0 }
        // Fast 80ms sampling interval to preserve responsiveness
        Thread.sleep(forTimeInterval: 0.08)
        guard let s2 = getCPUTicks() else { return 0.0 }

        let user = Double(s2.user >= s1.user ? s2.user - s1.user : 0)
        let sys = Double(s2.system >= s1.system ? s2.system - s1.system : 0)
        let nice = Double(s2.nice >= s1.nice ? s2.nice - s1.nice : 0)
        let idle = Double(s2.idle >= s1.idle ? s2.idle - s1.idle : 0)
        let total = user + sys + nice + idle

        if total > 0 {
            let percent = ((user + sys + nice) / total) * 100.0
            return (percent * 10).rounded() / 10
        }
        return 0.0
    }

    // 2. Memory (RAM)
    private static func measureMemory() -> (percent: Double, usedGB: Double, totalGB: Double) {
        var vmStats = vm_statistics64()
        var count = mach_msg_type_number_t(MemoryLayout<vm_statistics64_data_t>.size / MemoryLayout<integer_t>.size)
        let kerr = withUnsafeMutablePointer(to: &vmStats) {
            $0.withMemoryRebound(to: integer_t.self, capacity: Int(count)) {
                host_statistics64(mach_host_self(), HOST_VM_INFO64, $0, &count)
            }
        }

        let totalBytes = ProcessInfo.processInfo.physicalMemory
        let totalGB = (Double(totalBytes) / (1024.0 * 1024.0 * 1024.0) * 10).rounded() / 10

        if kerr == KERN_SUCCESS {
            let pageSize = UInt64(sysconf(_SC_PAGESIZE))
            let active = UInt64(vmStats.active_count) * pageSize
            let wired = UInt64(vmStats.wire_count) * pageSize
            let compressed = UInt64(vmStats.compressor_page_count) * pageSize
            let usedBytes = active + wired + compressed

            let usedGB = (Double(usedBytes) / (1024.0 * 1024.0 * 1024.0) * 10).rounded() / 10
            let percent = ((Double(usedBytes) / Double(totalBytes)) * 100.0 * 10).rounded() / 10
            return (percent, usedGB, totalGB)
        }

        return (0.0, 0.0, totalGB)
    }

    // 3. Disk (Storage)
    private static func measureDisk() -> (percent: Double, usedGB: Double, totalGB: Double) {
        do {
            let attrs = try FileManager.default.attributesOfFileSystem(forPath: "/")
            if let total = attrs[.systemSize] as? Int64,
               let free = attrs[.systemFreeSize] as? Int64 {
                let used = total - free
                let totalGB = (Double(total) / (1024.0 * 1024.0 * 1024.0) * 10).rounded() / 10
                let usedGB = (Double(used) / (1024.0 * 1024.0 * 1024.0) * 10).rounded() / 10
                let percent = ((Double(used) / Double(total)) * 100.0 * 10).rounded() / 10
                return (percent, usedGB, totalGB)
            }
        } catch {}
        return (0.0, 0.0, 0.0)
    }

    // 4. Battery
    private static func measureBattery() -> (hasBattery: Bool, percent: Int, isCharging: Bool, isPluggedIn: Bool) {
        guard let blob = IOPSCopyPowerSourcesInfo()?.takeRetainedValue(),
              let sources = IOPSCopyPowerSourcesList(blob)?.takeRetainedValue() as? [CFTypeRef],
              !sources.isEmpty else {
            return (false, 100, false, true)
        }

        for source in sources {
            guard let desc = IOPSGetPowerSourceDescription(blob, source)?.takeUnretainedValue() as? [String: Any] else {
                continue
            }

            let cap = desc[kIOPSCurrentCapacityKey] as? Int ?? 100
            let isCharging = desc[kIOPSIsChargingKey] as? Bool ?? false
            let powerState = desc[kIOPSPowerSourceStateKey] as? String ?? ""
            let isPluggedIn = powerState == kIOPSACPowerValue || isCharging

            return (true, cap, isCharging, isPluggedIn)
        }

        return (false, 100, false, true)
    }
}
