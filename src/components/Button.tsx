import {ButtonHTMLAttributes} from "react";

import '../styles/button.scss';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="button" {...props} />
    )
}
