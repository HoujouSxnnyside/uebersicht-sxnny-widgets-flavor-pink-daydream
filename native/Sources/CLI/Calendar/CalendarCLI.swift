import EventKit
import Foundation
import NativeBridgeCore

/// A single calendar event shown on the monthly grid.
struct CalendarEventItem: Codable, Sendable {
    /// The EventKit identifier, or a generated one when EventKit provides none.
    let id: String
    /// The day of the month on which the event starts.
    let day: Int
    /// The event title.
    let title: String
    /// Whether the event lasts all day.
    let isAllDay: Bool
    /// The calendar color as a hex string, if known.
    let colorHex: String?
}

/// The current month and its events, printed for the Little Calendar widget.
struct CalendarResponse: Codable, Sendable {
    /// The four-digit year.
    let year: Int
    /// The month number, from 1 to 12.
    let month: Int
    /// The English month name.
    let monthName: String
    /// The current day of the month.
    let today: Int
    /// The number of days in the month.
    let daysInMonth: Int
    /// The weekday of the first day, where `0` is Sunday and `1` is Monday.
    let firstWeekday: Int
    /// The events that start during the month.
    let events: [CalendarEventItem]
}

/// Entry point of the `calendar-cli` tool.
///
/// - Author: HoujouSxnnyside
/// - Since: 0.1.0
@main
struct CalendarCLI {
    static func main() {
        let calData = getMonthlyCalendar()
        NativeOutput.printJSON(calData)
    }

    /// Builds the current month and reads its events from EventKit.
    ///
    /// Events are included only when the process already has full calendar access.
    ///
    /// - Returns: The month layout and its events.
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
