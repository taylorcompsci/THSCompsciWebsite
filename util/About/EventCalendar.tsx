"use client"

import Calendar, { TileArgs } from "react-calendar";

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
    return (
        <Calendar tileContent={tileContent} tileClassName="calendar-tile"/>
    )
}