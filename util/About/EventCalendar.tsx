"use client"

import Calendar, { type TileArgs } from "react-calendar";
import { useState, useEffect } from "react";

import { type CalendarEntry, getCalendarEntries } from "@/actions/CalendarAction";

import "@/app/styles/calendarStyle.css";


function tileContent({view, date}: TileArgs)
{
    return (
        <div>
            {view}
            {date.toISOString()}
        </div>
    )
}

export default function EventCalendar()
{

    const [ _useDate, _setDate ] = useState<Date>(new Date());
    const [ _useEntries, setEntries ] = useState<CalendarEntry[]>([]);

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