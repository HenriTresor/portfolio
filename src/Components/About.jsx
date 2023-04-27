// import React from 'react'
import { motion } from "framer-motion"
import { ButtonVariant } from "../variants/ButtonVariant"
const About = () => {
    return (
        <div
            id="about"
            className="container  about-container"
        >
            <div
                style={{
                    wordBreak: 'break-word',
                    width: '40%',
                    textAlign: 'left',
                    lineHeight: '1.6',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2em'
                }}
            >
                <h1
                    className="bg-text"
                >About Me</h1>
                <motion.p
                    animate={{ y: 1 }}
                    initial={{ y: '-100dvh' }}
                    transition={{ delay: 0.6 }}
                >Hello there 👌</motion.p>
                <motion.h2
                    initial={{ x: '-100dvw' }}
                    animate={{ x: 1, type: 'spring' }}
                    transition={{ delay: 0.8 }}
                >My name is Henri Tresor, and I&apos;m a Web Developer  with great Creative Expertise!</motion.h2>
                <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 }}
                >I&apos;m a passionate software engineer with years of experience in writting efficient and clean code, creating full-stack web-based applications. I&apos;m committed to delivering high-quality work that meets the unique needs of each client. Let&apos;s work together to bring your vision to life in no time!
                </motion.p>

                <div
                    className="btn-div"
                >
                    <motion.button
                        variants={ButtonVariant}
                        whileHover='onHover'
                        onClick={() => {
                            location.assign('/#works')
                        }}
                    >See my works</motion.button>
                </div>
            </div>
            <div
                className="img-div"
            >

                <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 }}
                    src={'data:image/png;base64,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'}
                />
            </div>
        </div>
    )
}

export default About