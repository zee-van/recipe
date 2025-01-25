import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function Links({ path, title, children, style, useActive, handleOnClick }) {
  const location = useLocation();
  const isActive = location.pathname === path;
  let styleClass = 'py-2 px-6 text-xl bg-transparent rounded-full hover:bg-[#ff7034] transition-all';
  if (isActive) {
    styleClass = 'py-2 px-6 text-xl rounded-full bg-[#ff7034] transition-all';
  }
  return (
    <>
      {useActive &&
        <NavLink onClick={handleOnClick} to={path} className={styleClass}>
          {title}
          {children}
        </NavLink>
      }
      {!useActive &&
        <NavLink onClick={handleOnClick} to={path} className={style}>
          {title}
          {children}
        </NavLink>
      }
    </>
  )
}

export default Links