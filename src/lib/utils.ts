import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// if only seconds leading it with zeros .2 => 00.2
const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
});

// duration to hour minute seconds
export function formatDuration(duration: number) {
    const hours = Math.floor(duration / 60 / 60);
    const minutes = Math.floor((duration - hours * 60 * 60) / 60);
    const seconds = duration % 60;

    if (hours > 0) {
        return `${hours}:${LEADING_ZERO_FORMATTER.format(
            minutes
        )}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
    }

    return `${minutes}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
}

const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "always",
});

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
];

// https://blog.webdevsimplified.com/2020-07/relative-time-format/
export function formatTimeAgo(date: Date) {
    //getting the duration between our two dates and converting it from milliseconds to seconds
    let duration = (date.getTime() - new Date().getTime()) / 1000;

    //looping through each division
    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        //determining if the current duration is less than the amount of the division
        if (Math.abs(duration) < division.amount) {
            // reached the largest division possible
            // return our formatted string using the current duration and division
            return formatter.format(Math.round(duration), division.name);
        }
        //If this is not the largest division we then update our duration by converting to the next division
        duration /= division.amount;
    }
}
