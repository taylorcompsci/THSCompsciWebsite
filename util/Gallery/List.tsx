"use server"

import { promises } from "node:fs";
import path from "node:path"

const fileRegex = /(.+\.(PNG|JPG|JPEG|WEBP))$/i;

export default async function getChildren(path_arg: string)
{
    const dir = path.join(process.cwd(), "public", path_arg);

    // return dir;

    const files = await promises.readdir(dir);



    return files.map(val=> `/${path_arg}/${val}`).filter(val=>fileRegex.test(val));
}