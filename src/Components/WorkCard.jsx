// import React from 'react'
import { Card, Box, Button } from "@mui/material"
import { ArrowOutward, GitHub } from '@mui/icons-material'
import propTypes from 'prop-types'

const WorkCard = (props) => {
  return (
      <Card
          sx={{
              padding: 1,
            //   height: ,
              mr: 3,
              mt:4
          }}
          variant='outlined'
          square={true}
      >
          <Box>
              <img
                  width={'100%'}
                  height={'100%'}
                  src={props.image}
              />
              <Box
                  sx={{
                      
                      padding: 1,
                      mt:2
              }}
              >
                  <h2>{props.title }</h2>
                  <p
                      style={{
                          marginTop: '2em',
                          marginBottom:'2em'
                  }}
                  >{props.description}</p>

                  <div>
                      <Button
                          variant="outlined"
                          startIcon={<ArrowOutward />}
                          sx={{
                          float:'right',ml:2
                          }}
                          onClick={() => {
                              window.open(props.link)
                          }}
                      >
                         live
                      </Button>
                      <Button
                          startIcon={<GitHub />}
                          variant="contained"
                          color='info'
                          sx={{
                          float:'right'
                          }}
                          onClick={() => {
                              window.open(props.github)
                          }}
                      >
                          github
                      </Button>
                  </div>
              </Box>
        </Box>
    </Card>
  )
}

WorkCard.propTypes = {
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    link:propTypes.string,
    github:propTypes.string
}

export default WorkCard