import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const content = [
    { 
      id: 1, 
      url: 'foto1.jpeg', 
      desc: 'Selamat ulang tahun, Evita! Di hari spesial ini, semoga setiap langkahmu selalu dipenuhi keberkahan. Terima kasih telah menjadi pribadi yang luar biasa bagi orang-orang di sekitarmu.' 
    },
    { 
      id: 2, 
      url: 'foto2.jpeg', 
      desc: 'Teruslah bermimpi setinggi langit. Semoga segala cita-citamu dimudahkan jalannya, dan setiap kerja kerasmu membuahkan hasil yang manis di masa depan.' 
    },
    { 
      id: 3, 
      url: 'foto3.jpeg', 
      desc: 'Harapanku untukmu sederhana: semoga kamu selalu sehat, bahagia setiap hari, dan tidak pernah lelah untuk menebarkan kebaikan kepada siapapun.' 
    },
  ];

  const startExperience = () => {
    window.scrollTo(0, 0);
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play blocked", err));
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 via-pink-100 to-blue-200 min-h-screen font-sans relative overflow-x-hidden selection:bg-pink-300">
      
      {/* 1. AUDIO ELEMENT */}
      <audio ref={audioRef} loop>
        <source src="rasaini.mp3" type="audio/mpeg" />
      </audio>

      {/* 2. PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-2 bg-pink-500 z-[150] origin-left shadow-md"
        style={{ scaleX }}
      />

      {/* 3. NAVBAR FIXED */}
      <nav className="fixed top-0 w-full z-[100] bg-[#0284c7] border-b-4 border-[#0369a1] py-4 px-4 md:px-8 flex justify-center items-center text-white shadow-xl backdrop-blur-sm">
        <h1 className="text-sm md:text-xl font-black tracking-tighter uppercase text-center leading-tight">
          <span className="text-pink-300 italic text-xs md:text-lg">Happy Birthday 🌺</span><br />
          Evita Robbani Warid Nurzaman
        </h1>
      </nav>

      {/* 4. WELCOME PAGE OVERLAY DENGAN VIDEO BACKGROUND */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[130] flex items-center justify-center text-center overflow-hidden bg-black"
          >
            {/* VIDEO BACKGROUND */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
              <source src="/welcome-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Gradasi agar teks lebih tajam */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/40 to-black/80" />

            <div className="relative z-10 p-6 flex flex-col items-center">
                <motion.img 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  src="stitch1.gif" 
                  className="w-40 md:w-56 mx-auto mb-1 drop-shadow-2xl" 
                />
                <h1 className="text-white text-4xl md:text-7xl font-black mb-5 tracking-tighter uppercase leading-none drop-shadow-lg"> 
                  <span className='text-pink-300'>Happy Birthday🌺</span> <br />
                  <span>Evita Robbani Warid Nurzaman</span>
                </h1>
                <button 
                  onClick={startExperience} 
                  className="px-14 py-5 bg-[#0284c7] text-white rounded-full font-black hover:scale-105 transition-all duration-300 shadow-2xl tracking-widest uppercase text-xs"
                >
                    Klik disini
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MAIN CONTENT */}
      <main className="relative z-10 max-w-5xl mx-auto pt-40 md:pt-56 pb-16 px-6 space-y-32">
        {content.map((item, index) => (
          <motion.section 
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative"
          >
            <div className={`w-full lg:w-1/2 relative z-10 ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
              <motion.img 
                src="stitch1.gif"
                className="absolute z-30 w-20 md:w-28 -top-8 -left-4 drop-shadow-xl"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white transition-transform duration-500 hover:rotate-1">
                <div className="aspect-[4/5] w-full bg-blue-50">
                  <img src={item.url} alt="Moment" className="w-full h-full object-cover shadow-inner" />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border-2 border-dashed border-pink-300 shadow-xl relative flex flex-col justify-center min-h-[150px]">
                <p className="text-slate-700 text-lg md:text-2xl leading-relaxed font-semibold italic">
                  "{item.desc}"
                </p>
                <motion.img 
                  src="/stitch1.gif" 
                  className="absolute -bottom-10 -right-6 w-24 md:w-32 z-20 drop-shadow-lg"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.section>
        ))}

        {/* 6. CLOSING CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#0284c7] to-[#0c4a6e] p-12 md:p-20 rounded-[4rem] text-center text-white shadow-2xl relative overflow-hidden border-8 border-white/10 mt-32"
        >
          <motion.img 
            src="/stitch1.gif" 
            className="absolute -bottom-6 -right-6 w-40 md:w-56 opacity-40 -rotate-12" 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter uppercase">Happy Birthday!</h2>
            <p className="text-blue-100 text-lg md:text-2xl max-w-2xl mx-auto font-black leading-relaxed mb-10 italic">
                "Semoga semua cita-citamu tercapai dan kamu selalu menjadi Ohana yang membawa kebahagiaan bagi kami semua. Happy Birthday, Evita!"
            </p>
            <div className="px-10 py-3 bg-pink-500 inline-block rounded-full font-black tracking-widest uppercase text-xs animate-pulse shadow-lg">
                Make A Wish!
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-[12px] font-black tracking-[0.5em] uppercase bg-white/50 border-t border-blue-100 mt-20 ">
        Created by Digato
      </footer>
    </div>
  );
};

export default App;