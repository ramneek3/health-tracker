"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiMenu, FiX, FiHome, FiActivity, FiUser, FiCoffee } from "react-icons/fi"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-emerald-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FiActivity className="h-6 w-6" />
              <span className="font-bold text-xl">FitTrack</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-emerald-700 flex items-center">
              <FiHome className="mr-1" /> Dashboard
            </Link>
            <Link to="/workouts" className="px-3 py-2 rounded-md hover:bg-emerald-700 flex items-center">
              <FiActivity className="mr-1" /> Workouts
            </Link>
            <Link to="/nutrition" className="px-3 py-2 rounded-md hover:bg-emerald-700 flex items-center">
              <FiCoffee className="mr-1" /> Nutrition
            </Link>
            <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-emerald-700 flex items-center">
              <FiUser className="mr-1" /> Profile
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-emerald-700 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-emerald-600">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FiHome className="mr-2" /> Dashboard
              </div>
            </Link>
            <Link
              to="/workouts"
              className="block px-3 py-2 rounded-md hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FiActivity className="mr-2" /> Workouts
              </div>
            </Link>
            <Link
              to="/nutrition"
              className="block px-3 py-2 rounded-md hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FiCoffee className="mr-2" /> Nutrition
              </div>
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FiUser className="mr-2" /> Profile
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
