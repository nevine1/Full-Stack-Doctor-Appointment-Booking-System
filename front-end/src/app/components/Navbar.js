import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
      <div className="flex flex-row justify-between mx-10 my-0">
          <div>
              <h1>Logo </h1>
          </div>
          <div>
              <nav>
                  <ul>
                      <Link href="/">Home</Link>
                      <Link href="/">About</Link>
                      <Link href="/">Doctors</Link>
                      <Link href="/">Contact</Link>
                      <div>
                          <Link href="/auth/login">Login</Link>
                      </div>
                  </ul>

              </nav>
          </div>
      
    </div>
  )
}

export default Navbar
