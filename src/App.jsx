import React from 'react'
import Body from "./Components/Body";
import Contacts from "./Components/Contacts";
import Header from "./Components/Header";
import Loading from "./Components/Loading";
import Skills from "./Components/Skills";
import Works from "./Components/Works";

export default function App() {

  // eslint-disable-next-line no-constant-condition
  return (
    <React.Suspense  fallback={<Loading />}>
      <Header />
      <Body />
      <Skills />
      <Works />
      <Contacts />
    </React.Suspense>
 )
}