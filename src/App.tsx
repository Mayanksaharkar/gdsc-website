import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Events from "./components/Events/Events";
import Team from "./components/Team/Team";
import Contact from "./components/Contact/Contact";
import TeamPage from "./Pages/TeamPage";
import { Route, Routes } from "react-router-dom";

import { ScrollManager } from "./components/ui/ScrollManager";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useState } from "react";

function App() {
  const [section, setSection] = useState(0);

  return (
    <>
      <div
        className='App overflow-x-hidden
      '
      >
        <nav className='fixed w-full flex justify-center lg:p-4 p-2   items-center top-0 z-50'>
          <Navbar section={section} setSection={setSection} />
        </nav>
        <div className='h-screen w-screen'>
          <Canvas>
            <ScrollControls pages={5}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll html>
                <section
                  id='sectionHome'
                  className=' h-screen min-h-screen overflow-y-hidden'
                >
                  <Home />
                </section>
                <section
                  id='sectionAbout'
                  className=' w-screen  h-screen min-h-screen overflow-y-hidden'
                >
                  <About />
                </section>
                <section
                  className=' w-screen  h-screen min-h-screen overflow-y-hidden'
                  id='sectionEvents'
                >
                  <Events />
                </section>
                <section
                  className='w-screen  h-screen min-h-screen overflow-y-hidden'
                  id='sectionTeam'
                >
                  <Team />
                </section>
                <section
                  className='w-screen  h-screen min-h-screen max-h-screen overflow-y-hidden'
                  id='sectionContact'
                >
                  <Contact />
                </section>
              </Scroll>
            </ScrollControls>
          </Canvas>
        </div>
      </div>
      <Analytics />
    </>
  );
}

export default App;
