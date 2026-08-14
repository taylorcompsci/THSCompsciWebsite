import EventCalendar from "@/util/About/EventCalendar";
import { getCalendarEntries } from "@/actions/CalendarAction";

export default function About()
{   
    getCalendarEntries().then(e=>console.log(e));

    return (
        <div className="mt-10">
            <EventCalendar/>
        </div>
    );
}