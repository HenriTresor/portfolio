// import React from 'react'
import contactImg from '../assets/contact.png'
import { Grid, Button } from '@mui/material'
import {
    Facebook,
    LinkedIn,
    Google,
    Twitter,
    GitHub
} from '@mui/icons-material'
const Contacts = () => {
    return (
        <>
            <div
                id='contacts'
                className="container"
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div
                    className='img-div'
                >
                    <img src={contactImg}
                        style={{
                            transform: 'scale(0.7)'
                        }}
                        alt="" />
                </div>
                <div>
                    <h3>Reach me</h3>
                    <p>Let&apos;s Connect and Discuss your next project Today!</p>
                    <div
                        className='icons'
                    >
                        <span
                            onClick={() => {
                                window.open('https://www.linkedin.com/in/henri-tresor-shimwamana-21b292259/')
                            }}
                        ><LinkedIn /></span>
                        <span
                            onClick={() => {
                                window.open('https://twitter.com/@tresor_official')
                            }}
                        ><Twitter /></span>
                        <span
                            onClick={() => {
                                window.open('https://github.com/HenriTresor')
                            }}
                        ><GitHub /></span>
                        <span
                            onClick={() => {
                                window.open('mailto:shimwamanahenritresor@gmail.com')
                            }}
                        ><Google /></span>
                        <span
                            onClick={() => {
                                window.open('https://www.facebook.com/tresor0001/')
                            }}
                        ><Facebook /></span>
                    </div>

                    <div
                        className='form-div'
                    >
                        <form action="">
                            <Grid container spacing={4}>
                                <Grid item sm={6} md={6}>
                                    <input type="text"
                                        autoComplete='off'
                                        placeholder='enter your names' name='names' />
                                </Grid>
                                <Grid item sm={6} md={6}>
                                    <input type="text"
                                        style={{width:'100%'}}
                                        autoComplete='off'
                                        placeholder='enter your email' name='email' />
                                </Grid>
                                <Grid item sm={12} md={12}> 
                                    <textarea name="" id="" cols="80"
                                        rows="25"
                                        autoComplete='off'
                                        placeholder='input your message...'></textarea>
                                </Grid>
                                <Grid item sm={12} md={12}>
                                    <Button
                                        variant='contained'
                                    >
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contacts