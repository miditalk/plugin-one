'use client';

import * as Juce from 'juce-framework-frontend';

import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';

const setWindowScale = Juce.getNativeFunction('setWindowScale');

type PageProps = {
  onClick?: React.MouseEventHandler<HTMLLIElement>
}

export default function Page({
  onClick
}: PageProps) {
  const handleClick = (e:React.MouseEvent<HTMLLIElement>, value:number) => {
    if (onClick) {
      onClick(e);
    }
    setWindowScale(value);
  };

  return (
    <>
      <ListSubheader className="cursorDefault">
        Scale
      </ListSubheader>
      <MenuItem onClick={(e) => handleClick(e, 100)}>100%</MenuItem>
      <MenuItem onClick={(e) => handleClick(e, 150)}>150%</MenuItem>
      <MenuItem onClick={(e) => handleClick(e, 200)}>200%</MenuItem>
    </>
  );
}
