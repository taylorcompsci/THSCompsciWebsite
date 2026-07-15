import clsx from "clsx";

type ShadeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement> & { shade? : boolean, changeShadeOnHover?: boolean}, "className">;

export default function ShadeButton( {shade, changeShadeOnHover, type, ...props }: ShadeButtonProps)
{
    return (
        <button {...props} type={type ?? "button"} className={clsx("text-xl w-60 text-left p-3  max-md:text-3xl border border-white cursor-pointer transition-all duration-250 disabled:bg-shdn disabled:bg-none disabled:text-background",
            shade && "bg-white text-background",
            !shade && "text-white ",
            changeShadeOnHover && shade && "hover:text-white hover:bg-transparent",
            changeShadeOnHover && !shade && "hover:text-background hover:bg-white"

        )}>
        </button>
    )
}