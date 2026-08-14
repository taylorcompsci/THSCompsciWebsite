import { z } from "zod";

const BASE_URL = `${process.env.GOOGLE_CALENDAR_URL!}?key=${process.env.GOOGLE_CALENDAR_API_KEY!}`

type Timestamp = 
{
    dateTime: string,
    timeZone: string
}

export type CalendarEntry = 
{
    summary: string,
    start: Timestamp,
    end: Timestamp,
    recurrence: string[],
    description: string,
    location: string
}

async function getCalendarEntries()
{
    const currentDate = new Date();
    
    const startDate = (new Date(currentDate.getFullYear(), 0, 1)).toISOString();
    const endDate = (new Date(currentDate.getFullYear()+1, 11, 31)).toISOString();
    
    const googleURL = `${BASE_URL}&singleEvents=true&orderBy=startTime&timeMin=${startDate}&endDate=${endDate}`;

    console.log(googleURL);

    try
    {
        const response = await fetch(googleURL);
        const text = await response.text();
        const jsonStructure = JSON.parse(text);
    
        const unparsedEntries = jsonStructure["items"];
    
        const parsedEntries: CalendarEntry[] = unparsedEntries.map((e: any) => ({
            summary: e["summary"],
            start: e["start"],
    
            end: e["end"],
            
            description: e["description"] ?? "No provided description",
            location: e["location"] ?? "Location not specified.",

            recurrence: e["recurrence"] ?? []
        }));
    
        return parsedEntries;
    }
    catch (e)
    {
        throw new Error(`[ERROR]: ${e}`);
    }
}

export { getCalendarEntries }