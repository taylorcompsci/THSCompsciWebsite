export default function Command({ command, text }: { command: string, text: string })
{
    return (
        <div className="flex gap-x-1.5">
            <p className="text-2xl">{command}</p>
            <p className="text-2xl typewriter">{text}</p>
        </div>
    )
}