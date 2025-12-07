import React from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import UserNav from '@site/src/components/UserNav';
import type {Props} from '@theme/NavbarItem';

export default function NavbarItemWrapper(props: Props): JSX.Element {
  if (props.type === 'custom-user-nav') {
    return <UserNav />;
  }
  return <NavbarItem {...props} />;
}
