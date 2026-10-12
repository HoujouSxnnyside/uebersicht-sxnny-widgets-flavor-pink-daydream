import Foundation
@testable import NativeBridgeCore
import XCTest

struct SamplePayload: Codable, Equatable {
    let alpha: String
    let beta: Int
}

final class NativeBridgeTests: XCTestCase {
    func testNativeOutputEncoding() throws {
        let payload = SamplePayload(alpha: "pink", beta: 42)
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        let data = try encoder.encode(payload)
        let jsonString = String(data: data, encoding: .utf8)

        XCTAssertEqual(jsonString, "{\"alpha\":\"pink\",\"beta\":42}")
    }

    func testDecodingSamplePayload() throws {
        let json = "{\"alpha\":\"daydream\",\"beta\":100}"
        let data = try XCTUnwrap(json.data(using: .utf8))
        let decoded = try JSONDecoder().decode(SamplePayload.self, from: data)

        XCTAssertEqual(decoded.alpha, "daydream")
        XCTAssertEqual(decoded.beta, 100)
    }
}
