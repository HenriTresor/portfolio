// import React from 'react'
import { Card, Box, Button } from "@mui/material"
import { ArrowOutward } from '@mui/icons-material'
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
                          sx={{
                          float:'right'
                          }}
                          onClick={() => {
                              window.open(props.link)
                          }}
                      >
                          <ArrowOutward  />
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
    link:propTypes.string
}

export default WorkCard