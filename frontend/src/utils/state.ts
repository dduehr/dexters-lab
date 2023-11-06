import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function dispatch<T>(setState: Dispatch<SetStateAction<T>>) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setState(event.target.value as T) }
}