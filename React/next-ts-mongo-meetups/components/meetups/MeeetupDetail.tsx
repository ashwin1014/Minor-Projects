import { Props } from './MeetupItem'

import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props: Props): JSX.Element => {
    return (
        <section className={classes.detail}>
            <img src={props.image ?? ""}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <article>{props.description}</article>
        </section>
    )
}

export default MeetupDetail;