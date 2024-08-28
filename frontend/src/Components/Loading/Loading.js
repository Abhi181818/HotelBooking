import React from 'react'
import ReactLoading from 'react-loading';
import { motion } from 'framer-motion';
const Loading = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >

    <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "100vh",marginTop:"300px" }}
  >
    <ReactLoading type={"bubbles"} color={"red"} height={667} width={100} />
            </div>
            </motion.div>   
  
  )
}

export default Loading