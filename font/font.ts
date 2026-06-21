import { Archivo_Black, Inter, Manrope } from "next/font/google";

export const inter = Inter({
    weight:['100','200','300','400','500','600','700','800'],
    style:["normal"],
    subsets:["cyrillic","cyrillic-ext","greek","greek-ext","latin","latin-ext","vietnamese"]
})


export const manrope = Manrope({
     weight:['200','300','400','500','600','700','800'],
    style:["normal"],
    subsets:["cyrillic","cyrillic-ext","greek","latin","latin-ext","vietnamese"]
})

export const archivo_black = Archivo_Black({
    weight:"400"
})