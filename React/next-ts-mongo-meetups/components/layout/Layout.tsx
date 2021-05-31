import { ReactNode } from 'react';

import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
