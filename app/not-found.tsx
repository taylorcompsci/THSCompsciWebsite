import ShadeButton from "@/app/util/ShadeButton";

export default function notFound()
{
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-7xl">404 Not Found</h1>
            <ShadeButton changeShadeOnHover>Home</ShadeButton>
        </div>
    )

}