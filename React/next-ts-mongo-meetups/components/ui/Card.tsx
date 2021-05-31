import { ReactNode } from 'react';

import classes from './Card.module.css';

interface Props {
  children: ReactNode;
}

function Card(props: Props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
