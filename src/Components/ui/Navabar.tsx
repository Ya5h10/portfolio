export default function Navbar() {
  return (
    <nav className="sticky top-2 justify-center items-center max-w-7xl w-9/10 bg-gray-600/10 backdrop-blur-md mb-2 backdrop-saturate-50 mx-auto z-50 rounded-2xl">
      <div className="container mx-auto p-4 flex flex-1 justify-between items-center">
        <div className="text-blue-700 font-bold text-xl px-6">Yash <span className="text-gray-900"> Makwana </span></div>
        <div>
          <a href="mailto:connect@yashmakwana.com" className="text-gray-600 hover:text-black px-3">
            Contact
          </a>
          <a href="#projects" className="text-gray-600 hover:text-black px-3">
            Projects
          </a>
          <a href="#Resume" className="text-gray-600 hover:text-black px-3">
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}   