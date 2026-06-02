import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/masjid-sound-solutions', label: 'Masjid Sound Solutions' },
  { to: '/commercial-audio', label: 'Commercial Audio' },
  { to: '/residential-audio', label: 'Residential Audio' },
  { to: '/event-rental-services', label: 'Event Rental Services' },
  { to: '/about', label: 'About' },
]

function HamburgerIcon() {
  return (
    <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
      <path d='M4 6h16M4 12h16M4 18h16' />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
      <path d='M6 18L18 6M6 6l12 12' />
    </svg>
  )
}

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
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
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
              Professional audio solutions for masjids, commercial spaces, homes, and events across the USA and Canada.
            </p>
          </div>

          <div>
            <div className='footer-heading'>Divisions</div>
            <ul className='footer-list'>
              <li><Link to='/masjid-sound-solutions'>Masjid Sound Solutions</Link></li>
              <li><Link to='/commercial-audio'>Commercial Audio</Link></li>
              <li><Link to='/residential-audio'>Residential Audio</Link></li>
              <li><Link to='/event-rental-services'>Event Rental Services</Link></li>
              <li><Link to='/services'>All Services</Link></li>
            </ul>
          </div>

          <div>
            <div className='footer-heading'>Contact</div>
            <ul className='footer-list'>
              <li>
                <a href='mailto:contact@azaudios.com'>contact@azaudios.com</a>
              </li>
              <li>
                <a href='tel:+17248310196'>+1 724 831 0196</a>
              </li>
              <li>
                <a href='tel:+17244275661'>+1 724 427 5661</a>
              </li>
              <li>USA and Canada</li>
            </ul>
            <div className='footer-contact-links'>
              <a
                href='https://wa.me/17248310196'
                target='_blank'
                rel='noreferrer'
                className='footer-wa-btn'
              >
                <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className='container footer-bottom'>
          © {new Date().getFullYear()} AZ Audio Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
