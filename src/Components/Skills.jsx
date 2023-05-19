// import React from 'react'
import { Grid } from "@mui/material"
import LinearProgressWithLabel from "./LinearProgressWithLabel"
import {motion} from 'framer-motion'
// import { useRef } from "react"

const skillsArr = [
    {
        skill: "HTML & CSS",
        value:99
    },
    {
        skill: "PHP",
        value:93
    },
    {
        skill: "ReactJS",
        value:90
    },
    {
        skill: "NextJS",
        value:80
    },
    {
        skill: "NodeJS",
        value:93
    },
    {
        skill: "Tailwind",
        value:90
    },
    {
        skill: "Bootstrap",
        value:95
    },
    {
        skill: "JavaScript",
        value:97
    },
    {
        skill: "MongoDB",
        value:98
    },
    {
        skill: "MySQL",
        value:90
    },
    {
        skill: "C lang",
        value:85
    },
]

const Skills = () => {
    // const scrollRef = useRef(null)
  return (
      <motion.div
       
          id="skills"
      className="container"
      >
          <h1
          className="bg-text"
          >
              My Skills
          </h1>
          <motion.div
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2, delayChildren: 2 }}
              whileInView={{ opacity: 1 }}
          >
              <h2>My skills</h2>
              <p
                  style={{
                      textAlign:'center'
                  }}
              >
                  Throughout my career i managed to get programming skills in the following skills to a high level
              </p>
          </motion.div>
          <motion.div
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2, delayChildren: 2 }}
              whileInView={{ opacity: 1 }}
          >
              <Grid container spacing={10}>
                  {
                      skillsArr?.map(el => {
                          return (
                              <Grid item
                                  md={6}
                                  xs={12}
                                  sm={12}
                                  key={el?.skill}
                              >
                             
                              <LinearProgressWithLabel
                                      skill={el?.skill}
                                      value={el?.value}
                                  />
                </Grid>
                                  )
                                })
                            }
              </Grid>
          </motion.div>
      </motion.div>
  )
}

export default Skills