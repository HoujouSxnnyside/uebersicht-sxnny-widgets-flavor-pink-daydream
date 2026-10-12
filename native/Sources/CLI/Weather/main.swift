import Foundation
import NativeBridgeCore

struct WeatherResponse: Codable, Sendable {
    let temperature: Double
    let apparentTemperature: Double
    let precipitationProbability: Int
    let condition: String // "sunny" | "partlyCloudy" | "cloudy" | "rainy" | "stormy" | "snowy" | "night"
    let conditionText: String
    let isDay: Bool
    let city: String
}

// Open-Meteo response decoding structures
struct OpenMeteoResult: Decodable, Sendable {
    let current: CurrentMeteo?
    let timezone: String?

    struct CurrentMeteo: Decodable, Sendable {
        let temperature_2m: Double?
        let apparent_temperature: Double?
        let precipitation_probability: Int?
        let weather_code: Int?
        let is_day: Int?
    }
}

// IP-based geolocation fallback structure
struct IPLocation: Decodable, Sendable {
    let lat: Double?
    let lon: Double?
    let city: String?
}

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

@main
struct WeatherCLI {
    static func main() async {
        let weather = await fetchWeather()
        NativeOutput.printJSON(weather)
    }

    private static func fetchWeather() async -> WeatherResponse {
        // Default fallback coordinates
        var lat: Double = 19.4326 // Default Mexico City / Central Time fallback
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
                let isDay = (current.is_day ?? 1) == 1
                let (cond, text) = mapWeatherCode(code: current.weather_code, isDay: isDay)

                return WeatherResponse(
                    temperature: current.temperature_2m ?? 22.0,
                    apparentTemperature: current.apparent_temperature ?? 22.0,
                    precipitationProbability: current.precipitation_probability ?? 0,
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
