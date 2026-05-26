import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/masjid-sound-solutions', label: 'Masjid Sound Solutions' },
  { to: '/commercial-audio', label: 'Commercial Audio' },
  { to: '/residential-audio', label: 'Residential Audio' },
  { to: '/event-rental-services', label: 'Event Rental Services' },
  { to: '/contact', label: 'Contact' }
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className='site-shell'>
      <header className='site-header'>
        <div className='container header-inner'>
          <Link to='/' className='brand'>
            <img src='/logo-az.png' alt='AZ Audio Solutions logo' className='brand-logo brand-logo-wide' />
          </Link>

          <button
            className='menu-toggle'
            aria-label='Toggle navigation'
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to='/contact' className='button button-primary nav-cta'>
              Request a Quote
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className='site-footer'>
        <div className='container footer-grid'>
          <div>
            <img src='/logo-az-transparent.png' alt='AZ Audio Solutions logo' className='footer-logo' />
            <p className='footer-copy'>
              Professional audio solutions for masjids, commercial spaces, homes, and events.
            </p>
          </div>

          <div>
            <div className='footer-heading'>Divisions</div>
            <ul className='footer-list'>
              <li>Masjid Sound Solutions</li>
              <li>Commercial Audio</li>
              <li>Residential Audio</li>
              <li>Event Rental Services</li>
            </ul>
          </div>

          <div>
            <div className='footer-heading'>Contact</div>
            <ul className='footer-list'>
              <li>contact@azaudios.com</li>
              <li>+1 724 831 0196</li>
              <li>USA and Canada</li>
            </ul>
          </div>
        </div>

        <div className='container footer-bottom'>
          © {new Date().getFullYear()} AZ Audio Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
