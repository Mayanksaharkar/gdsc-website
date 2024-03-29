import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Events from "./components/Events/Events";
import Team from "./components/Team/Team";
import Contact from "./components/Contact/Contact";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { ScrollManager } from "./components/ui/ScrollManager";

function App() {
  const [section, setSection] = useState(0);
  
  


  return (
    <>
      <div className='App overflow-x-hidden'>
        <nav className='fixed w-full flex justify-center lg:p-4 p-2 items-center top-0 z-50'>
          <Navbar section={section} setSection={setSection} />
        </nav>
        <div className='h-screen'>
          <Canvas>
            <ScrollControls pages={5} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll html>
                <section
                  id='sectionHome'
                  className='h-screen min-h-screen overflow-y-hidden w-full'
                >
                  <Home />
                </section>
                <section
                  id='sectionAbout'
                  className='h-screen min-h-screen overflow-y-hidden w-full'
                >
                  <About />
                </section>
                <section
                  id='sectionEvents'
                  className='h-screen min-h-screen overflow-y-hidden w-full'
                >
                  <Events />
                </section>
                <section
                  id='sectionTeam'
                  className='h-screen min-h-screen overflow-y-hidden w-full'
                >
                  <Team />
                </section>
                <section
                  id='sectionContact'
                  className='w-full h-screen min-h-screen max-h-screen overflow-y-hidden'
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
