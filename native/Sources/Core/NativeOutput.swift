import Foundation

/// Writes Swift models to standard output as JSON.
///
/// The native command-line tools use this type so every Übersicht widget receives
/// the same single-line, key-sorted payload.
///
/// - Author: HoujouSxnnyside
/// - Since: 0.1.0
public enum NativeOutput {
    private static let encoder: JSONEncoder = {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        return encoder
    }()

    /// Prints a model to standard output as a single-line JSON string.
    ///
    /// If encoding fails, writes a JSON error object to standard error and exits with status 1.
    ///
    /// - Parameter value: The model to encode.
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
