import React from 'react'

function Button({children,title, btnStyle, handleOnClick, status}) {
  let customStyle = 'py-2 px-4 bg-[#ff4000] text-stone-100 rounded-md font-bold hover:bg-[#ff7034]'
  return (
    <button className={btnStyle ? btnStyle : customStyle} onClick={handleOnClick} disabled={status}>
        {title}
        {children}
    </button>
  )
}

export default Button