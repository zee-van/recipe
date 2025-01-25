import React from 'react'

function Input({ id, label, icon, title, ...props }) {
  return (
    <div className='flex flex-col gap-1 relative'>
      <label htmlFor={id} className='uppercase text-stone-200 font-bold text-sm tracking-wider'>{label}</label>
      {title === 'textarea' ? <textarea id={id} name={id} className='py-2 px-4 outline-none text-stone-200 bg-zinc-800 rounded-sm resize-none' {...props} /> : <input id={id} name={id} className='py-2 px-4 outline-none text-stone-200 bg-zinc-800 rounded-sm' {...props} />}
      {!label && <span className='text-[#ff4d00] text-2xl absolute top-0 right-0 p-3'>{icon}</span>}
      {label && <span className='text-[#ff4d00] text-xl absolute top-5 right-0 p-3'>{icon}</span>}
    </div>
  )
}

export default Input