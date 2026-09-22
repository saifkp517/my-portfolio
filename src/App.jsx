import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Zentra from './components/Zentra.jsx'
import Erp from './components/Erp.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Zentra />
        <Erp />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
