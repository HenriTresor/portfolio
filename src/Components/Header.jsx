// import React from 'react'
import {motion} from 'framer-motion'
import { ButtonVariant } from "../variants/ButtonVariant"
const Header = () => {
  return (
      <div
          className="header"
      >
          <div>
              <motion.h2
                  transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
                  animate={{ y: 1 }}
                  initial={{y:-500}}
              >HT</motion.h2>
          </div>

          <div>
              <motion.ul
                  transition={{ delay: 1, type: 'spring', stiffness: 80 }}
                  initial={{ x: 700 }}
                  animate={{x:1}}
              >
                  <motion.li
                      whileHover={{ scale: 1.2 }}
                      transition={{type:'spring', stiffness:500}}
                  >
                      <a href="#about">About</a>
                  </motion.li>
                  <motion.li
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                  >
                      <a href="#skills">skills</a>
                  </motion.li>
                  <motion.li
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                  >
                      <a href="#works">Works</a>
                  </motion.li>
                  <motion.li
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                  >
                      <a href="#contacts">contacts</a>
                  </motion.li>
                 
              </motion.ul>
              <motion.button
                  variants={ButtonVariant}
                  whileHover='onHover'
                  onClick={() => {
                      window.open('https://www.linkedin.com/in/henri-tresor-shimwamana-21b292259/')
                  }}
              >
                  Hire me
              </motion.button>
          </div>
      </div>
  )
}

export default Header