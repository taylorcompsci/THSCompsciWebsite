"use client"

import Calendar, { TileArgs } from "react-calendar";
import { useEffect, useState } from "react";
import { getCalendarEntries, type CalendarEntry } from "@/actions/CalendarAction";

function tileContent({view, date}: TileArgs)
{
    return (
        <div>
            {/* TEST */}
        </div>
    )
}

export default function EventCalendar()
{

    const [ useDate, setDate ] = useState<Date>(new Date());
    const [ useEntries, setEntries ] = useState<CalendarEntry[]>([]);

    useEffect(()=>{
        getCalendarEntries().then((events)=>{setEntries(events); console.log(events)}).catch(err=> { throw err})
    }, []);

    return (
        <div className="flex">
            <div>
                Event Model
            </div>
            <Calendar tileContent={tileContent} tileClassName="calendar-tile"/>
        </div>
    )
}