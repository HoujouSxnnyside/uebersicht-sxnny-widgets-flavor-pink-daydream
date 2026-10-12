import EventKit
import Foundation
import NativeBridgeCore

struct CalendarEventItem: Codable, Sendable {
    let id: String
    let day: Int
    let title: String
    let isAllDay: Bool
    let colorHex: String?
}

struct CalendarResponse: Codable, Sendable {
    let year: Int
    let month: Int
    let monthName: String
    let today: Int
    let daysInMonth: Int
    let firstWeekday: Int // 0: Sunday, 1: Monday, etc.
    let events: [CalendarEventItem]
}

@main
struct CalendarCLI {
    static func main() {
        let calData = getMonthlyCalendar()
        NativeOutput.printJSON(calData)
    }

    private static func getMonthlyCalendar() -> CalendarResponse {
        let calendar = Calendar.current
        let now = Date()

        let year = calendar.component(.year, from: now)
        let month = calendar.component(.month, from: now)
        let today = calendar.component(.day, from: now)

        // Month name formatted in English
        let dateFormatter = DateFormatter()
        dateFormatter.locale = Locale(identifier: "en_US")
        dateFormatter.dateFormat = "MMMM"
        let monthName = dateFormatter.string(from: now)

        // Total days in this month
        let range = calendar.range(of: .day, in: .month, for: now)
        let daysInMonth = range?.count ?? 30

        // First day of the month
        var components = calendar.dateComponents([.year, .month], from: now)
        components.day = 1
        let firstOfMonth = calendar.date(from: components) ?? now
        // Apple's Calendar weekday: 1 = Sunday, 2 = Monday... mapped to 0 = Sunday
        let firstWeekday = (calendar.component(.weekday, from: firstOfMonth) - 1 + 7) % 7

        // End of the month
        var endComponents = components
        endComponents.day = daysInMonth
        endComponents.hour = 23
        endComponents.minute = 59
        endComponents.second = 59
        let endOfMonth = calendar.date(from: endComponents) ?? now

        var eventList: [CalendarEventItem] = []

        // Query Apple EventKit
        let store = EKEventStore()
        let status = EKEventStore.authorizationStatus(for: .event)

        if status == .fullAccess {
            let predicate = store.predicateForEvents(withStart: firstOfMonth, end: endOfMonth, calendars: nil)
            let nativeEvents = store.events(matching: predicate)

            for event in nativeEvents {
                let eventDay = calendar.component(.day, from: event.startDate)
                eventList.append(
                    CalendarEventItem(
                        id: event.eventIdentifier ?? UUID().uuidString,
                        day: eventDay,
                        title: event.title ?? "Event",
                        isAllDay: event.isAllDay,
                        colorHex: nil
                    )
                )
            }
        }

        return CalendarResponse(
            year: year,
            month: month,
            monthName: monthName,
            today: today,
            daysInMonth: daysInMonth,
            firstWeekday: firstWeekday,
            events: eventList
        )
    }
}
