export function isValidURL(url: string): boolean
{
    try {
        const urlLiteral = new URL(url);
        return true
    }
    catch
    {
        return false;
    }
}