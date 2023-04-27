// import React from 'react'
import { Box, LinearProgress, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const LinearProgressWithLabel = (props) => {
  return (

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 0
        }}
      >
        <Box

          sx={{
            width: '100%',
            mr: 1
          }}
        >
          <Box
            sx={{
              minWidth: 35
            }}
          >
            <Typography>
              {`${props.skill}`}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box
          sx={{
            minWidth: 35
          }}
        >
          <Typography>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  skill: PropTypes.string.isRequired
}

export default LinearProgressWithLabel