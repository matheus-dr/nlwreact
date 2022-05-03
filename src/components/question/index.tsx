import './styles.scss'
import {ReactNode} from "react";
import cx from 'classnames'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean
    isHighlighted?: boolean
}

export function Question(props: QuestionProps) {
    return (
        <div
            className={cx(
                'question',
                { answered: props.isAnswered },
                { highlighted: props.isHighlighted && !props.isAnswered },
            )}
        >
            <p>{props.content}</p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name}/>
                    <span>{props.author.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </footer>
        </div>
    )
}
