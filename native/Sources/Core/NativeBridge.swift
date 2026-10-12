import Foundation

/// Helpers to output Swift models as clean JSON to stdout
public enum NativeOutput {
    private static let encoder: JSONEncoder = {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        return encoder
    }()

    /// Prints an Encodable model to stdout as a single-line JSON string
    public static func printJSON<T: Encodable>(_ value: T) {
        do {
            let data = try encoder.encode(value)
            if let string = String(data: data, encoding: .utf8) {
                print(string)
            }
        } catch {
            fputs("{\"error\": \"\(error.localizedDescription)\"}\n", stderr)
            exit(1)
        }
    }
}
