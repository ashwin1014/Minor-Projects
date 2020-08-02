import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ src, setSelectedImg }) => {

    const handleClose = (e) => {
        if(e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='backdrop' onClick={handleClose}>
            <motion.img initial={{ y: '-100vh' }} animate={{ y: 0 }} src={src} alt='enlarged'/>
        </motion.div>
    )
};

export default Modal;
