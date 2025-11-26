import Particles from "./Effects/Particles";
import {motion} from "motion/react"
import {ChevronsDown} from "lucide-react"
 
export default function Hero(){



    return(
        <section className=" min-h-screen overflow-hidden">

            <div className="absolute top-0 left-0 w-full min-h-screen h-full z-10">
            <Particles
                particleColors={['#30302f', '#000000']}
                particleCount={1000}
                particleSpread={10}
                speed={0.2}
                particleBaseSize={50}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={true}
            />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto mt-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mt-10">Yash Makwana</h1>
                    <p className="text-2xl md:text-3xl mt-4 text-gray-800">
                    AI & Full Stack Developer
                    </p>

                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed px-4 mt-20">
                    I'm a full stack developer and AI enthusiast, specializing in building 
                    intelligent, scalable, and user centric digital solutions. I combine 
                    modern web technologies with AI powered tools to create products that 
                    are not only functional but also intuitive and impactful.
                    </p>

                    <p className="mt-4 text-xl md:text-2xl text-gray-700">
                    Explore my work — this is where innovation meets execution.
                    </p>

                    {/* CTA Button */}
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-18 px-8 py-3 text-xl md:text-2xl text-white font-medium 
                    bg-linear-to-br from-purple-900 via-purple-600 to-purple-400 
                    rounded-2xl shadow-lg z-50"
                    >
                    Hire Now
                    </motion.button>
                <ChevronsDown size="50px" className="mt-20 text-gray-600/60 text-4xl animate-bounce"/>

            </div>

        </section>
    )
}