import { Props } from './MeetupItem'

const MeetupDetail = (props: Props): JSX.Element => {
    return (
        <>
            <img src={props.image}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <article>{props.description}</article>
        </>
    )
}

export default MeetupDetail;