import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';


const Modal = forwardRef(function Modal({ children, modalStyle }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            },
            close: () => {
                dialog.current.close();
            }
        }
    })

    function defaultCloseModal() {
        dialog.current.close();
    }
    let normalStyle = 'my-auto mx-auto p-4 rounded-md border-2 border-[#ff4d00] backdrop:bg-stone-950/90';
    return(
        <dialog ref={dialog} className={modalStyle ? modalStyle : normalStyle}>
            <span onClick={defaultCloseModal} className='absolute cursor-pointer top-0 right-0 bg-[#ff4d00] rounded-md text-3xl'><IoIosClose /></span>
            {children}
        </dialog>
    )
})

export default Modal;