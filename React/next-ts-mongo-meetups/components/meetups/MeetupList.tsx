import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

import { Props } from './MeetupItem';

interface MeetupProps {
  meetups: Props[]
}

function MeetupList(props: MeetupProps) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup: Props) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
