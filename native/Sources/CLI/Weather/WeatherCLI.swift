import Foundation
import NativeBridgeCore

/// The weather snapshot printed for the Weather Garden widget.
struct WeatherResponse: Codable, Sendable {
    /// Air temperature in degrees Celsius.
    let temperature: Double
    /// Perceived ("feels like") temperature in degrees Celsius.
    let apparentTemperature: Double
    /// Chance of precipitation, from 0 to 100.
    let precipitationProbability: Int
    /// One of `sunny`, `partlyCloudy`, `cloudy`, `rainy`, `stormy`, `snowy` or `night`.
    let condition: String
    /// A short human-readable description of the condition.
    let conditionText: String
    /// Whether the sun is currently up at the resolved location.
    let isDay: Bool
    /// The city name resolved from the IP address, or a friendly fallback.
    let city: String
}

/// The subset of the Open-Meteo forecast response that this tool reads.
struct OpenMeteoResult: Decodable, Sendable {
    /// The current conditions, if the service returned them.
    let current: CurrentMeteo?
    /// The IANA time zone of the forecast location.
    let timezone: String?

    /// The current-conditions block of the Open-Meteo response.
    struct CurrentMeteo: Decodable, Sendable {
        /// Air temperature in degrees Celsius.
        let temperature2m: Double?
        /// Perceived temperature in degrees Celsius.
        let apparentTemperature: Double?
        /// Chance of precipitation, from 0 to 100.
        let precipitationProbability: Int?
        /// The WMO weather interpretation code.
        let weatherCode: Int?
        /// `1` during the day and `0` at night.
        let isDay: Int?

        private enum CodingKeys: String, CodingKey {
            case temperature2m = "temperature_2m"
            case apparentTemperature = "apparent_temperature"
            case precipitationProbability = "precipitation_probability"
            case weatherCode = "weather_code"
            case isDay = "is_day"
        }
    }
}

/// The approximate location returned by the IP geolocation service.
struct IPLocation: Decodable, Sendable {
    let lat: Double?
    let lon: Double?
    let city: String?
}

/// Maps a WMO weather code to a widget condition and a short description.
///
/// - Parameters:
///   - code: The WMO weather interpretation code, or `nil` when unknown.
///   - isDay: Whether the sun is currently up.
/// - Returns: The condition identifier used by the widget and its display text.
func mapWeatherCode(code: Int?, isDay: Bool) -> (condition: String, text: String) {
    guard let c = code else {
        return isDay ? ("sunny", "Sunny") : ("night", "Clear night")
    }

    switch c {
    case 0:
        return isDay ? ("sunny", "Clear sky") : ("night", "Clear night")
    case 1, 2:
        return isDay ? ("partlyCloudy", "Partly cloudy") : ("night", "Cloudy night")
    case 3:
        return ("cloudy", "Overcast")
    case 45, 48:
        return ("cloudy", "Foggy")
    case 51...67:
        return ("rainy", "Light rain")
    case 80...82:
        return ("rainy", "Rain showers")
    case 95...99:
        return ("stormy", "Thunderstorm")
    case 71...77, 85, 86:
        return ("snowy", "Snow")
    default:
        return isDay ? ("sunny", "Pleasant") : ("night", "Peaceful night")
    }
}

/// Entry point of the `weather-cli` tool.
///
/// - Author: HoujouSxnnyside
/// - Since: 0.1.0
@main
struct WeatherCLI {
    static func main() async {
        let weather = await fetchWeather()
        NativeOutput.printJSON(weather)
    }

    /// Resolves the location from the IP address and fetches current weather from Open-Meteo.
    ///
    /// - Returns: The current weather, or a pleasant default when the network is unavailable.
    private static func fetchWeather() async -> WeatherResponse {
        // Fallback coordinates (Mexico City), used when IP geolocation fails.
        var lat: Double = 19.4326
        var lon: Double = -99.1332
        var cityName = "Daydream Garden"

        // 1. Fetch approximate location via IP with fast 1.5s timeout
        if let ipUrl = URL(string: "http://ip-api.com/json/?fields=lat,lon,city") {
            var ipReq = URLRequest(url: ipUrl)
            ipReq.timeoutInterval = 1.5
            if let (data, _) = try? await URLSession.shared.data(for: ipReq),
               let loc = try? JSONDecoder().decode(IPLocation.self, from: data) {
                if let lLat = loc.lat, let lLon = loc.lon {
                    lat = lLat
                    lon = lLon
                }
                if let cName = loc.city, !cName.isEmpty {
                    cityName = cName
                }
            }
        }

        // 2. Query Open-Meteo
        let meteoUrlString = "https://api.open-meteo.com/v1/forecast?latitude=\(lat)&longitude=\(lon)&current=temperature_2m,apparent_temperature,precipitation_probability,weather_code,is_day&timezone=auto"

        if let meteoUrl = URL(string: meteoUrlString) {
            var meteoReq = URLRequest(url: meteoUrl)
            meteoReq.timeoutInterval = 3.0

            if let (data, _) = try? await URLSession.shared.data(for: meteoReq),
               let meteo = try? JSONDecoder().decode(OpenMeteoResult.self, from: data),
               let current = meteo.current {
                let isDay = (current.isDay ?? 1) == 1
                let (cond, text) = mapWeatherCode(code: current.weatherCode, isDay: isDay)

                return WeatherResponse(
                    temperature: current.temperature2m ?? 22.0,
                    apparentTemperature: current.apparentTemperature ?? 22.0,
                    precipitationProbability: current.precipitationProbability ?? 0,
                    condition: cond,
                    conditionText: text,
                    isDay: isDay,
                    city: cityName
                )
            }
        }

        return WeatherResponse(
            temperature: 23.0,
            apparentTemperature: 22.0,
            precipitationProbability: 10,
            condition: "sunny",
            conditionText: "Sunny in the garden",
            isDay: true,
            city: cityName
        )
    }
}
