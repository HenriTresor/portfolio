// import React from 'react'

import WorkCard from "./WorkCard"
import { Grid } from "@mui/material"
import sociala from '../assets/sociala.png'
import bidify from '../assets/bidify.png'
import gitUsers from '../assets/git-users.png'
import revo from '../assets/revo.png'
import { motion } from "framer-motion"


const Works = () => {
  return (
      <motion.div
          initial={{ background: 'none', opacity: 0}}
          transition={{delay:0.3}}
          whileInView={{opacity:1}}
          id="works"
      className="container"
      >
          <h1 className="bg-text">
              My Works
          </h1>
          <h2>My works</h2>
          <p>
              I have developed different full-stack web applications. Here are some of them
          </p>
          <div>
              <Grid container >
                  
                  <Grid item sm={12}
                      md={4}
                   
                  >
                      <WorkCard
                          image={sociala}
                          title={'sociala'}
                          github='https://github.com/HenriTresor/react-social'
                          description="A social media application where users can posts, create pages for their organisations and chat in real time"
                          link='https://sociala.onrender.com'
                      />
                  </Grid>
                  <Grid item sm={12} md={4}>
                      <WorkCard
                          image={bidify}
                          github='https://github.com/HenriTresor/real-time-auction-app'
                          title={'Bidify'}
                          link='https://bidify.onrender.com'
                          description="A real time auctioning application where users can create auctions and place bids"
                      />
                  </Grid>
                  <Grid item sm={12} md={4}>
                      <WorkCard
                          image={gitUsers}
                          github='https://github.com/HenriTresor/git-users-react'
                          title={'Github users'}
                          link='https://github-userst.netlify.app/'
                        description="An application which uses Github API to retrieve and view different github accounts"
                      />
                  </Grid>
                  <Grid item sm={12} md={4}>
                      <WorkCard
                          image={revo}
                          title={'REVO online store'}
                          link='https://github.com/HenriTresor/revo-store'
                          github='https://github.com/HenriTresor/revo-store'
                        description="Online e-commerce platform that offers a variety of different products"
                      />
                  </Grid>
              </Grid>
          </div>
      </motion.div>
  )
}

export default Works