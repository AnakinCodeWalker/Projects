
import './App.css'
import { useEffect } from 'react';

export default function Portfolio() {
  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal-target");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-[20px]");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      });

      revealItems.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    } else {
      revealItems.forEach((item) => {
        item.classList.add("opacity-100", "translate-y-0");
        item.classList.remove("opacity-0", "translate-y-[18px]");
      });
    }
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80, // header height adjust
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="m-0 font-['Inter',Arial,sans-serif] text-[#15171a] bg-[#fbfaf7] animate-[pageFade_520ms_ease-out_both] scroll-smooth">
      <style>{`
        @keyframes pageFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-bg-gradient {
          background: linear-gradient(135deg, rgba(15, 118, 110, 0.12), transparent 35%),
                      linear-gradient(315deg, rgba(196, 95, 44, 0.14), transparent 38%),
                      #fbfaf7;
        }
        .text-link-hover::after {
          position: absolute; right: 0; bottom: -4px; left: 0; height: 2px;
          content: ""; background: currentColor; transform: scaleX(0);
          transform-origin: left; transition: transform 180ms ease;
        }
        .text-link-hover:hover::after { transform: scaleX(1); }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 1ms !important;
          }
          .reveal-target { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-[clamp(20px,5vw,72px)] py-[18px] bg-[#fbfaf7]/90 border-b border-[#d7dedb]/80 backdrop-blur-[18px] max-[680px]:items-start max-[680px]:gap-[16px]">
        <a className="grid w-[44px] h-[44px] place-items-center text-[#ffffff] font-extrabold bg-[#15171a] rounded-[8px] transition-all duration-180 hover:bg-[#0b4f4a] hover:-rotate-3 hover:scale-[1.04]" href="#top" aria-label="Prince Kumar home">
          PK
        </a>
        <nav className="flex gap-[clamp(14px,3vw,34px)] text-[#5d6571] text-[0.95rem] font-semibold max-[680px]:grid max-[680px]:grid-cols-2 max-[680px]:gap-y-[10px] max-[680px]:gap-x-[18px] max-[680px]:w-[min(280px,70vw)]" aria-label="Primary navigation">
          <a onClick={() => scrollToSection("#projects")} className="cursor-pointer hover:text-[#0f766e] transition-colors duration-200">Projects</a>

          <a onClick={() => scrollToSection("#experience")} className="cursor-pointer hover:text-[#0f766e] transition-colors duration-200">Experience</a>

          <a onClick={() => scrollToSection("#skills")} className="cursor-pointer hover:text-[#0f766e] transition-colors duration-200">Skills</a>

          <a className="hover:text-[#0f766e] transition-colors duration-200" href="Prince_Kumar_Resume.pdf">Resume</a>

          <a onClick={() => scrollToSection("#contact")} className="cursor-pointer hover:text-[#0f766e] transition-colors duration-200">Contact</a>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="grid grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] gap-[clamp(28px,5vw,70px)] min-h-[calc(100vh-82px)] items-center px-[clamp(20px,5vw,72px)] py-[clamp(54px,8vw,110px)] hero-bg-gradient max-[900px]:grid-cols-1 max-[680px]:min-h-auto max-[680px]:pt-[46px]">
          <div className="max-w-[820px] animate-[riseIn_720ms_ease-out_90ms_both]">
            <h1 className="mt-0 mb-[22px] text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-normal font-bold">Prince Kumar</h1>
            <p className="mt-0 max-w-[700px] text-[#5d6571] text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.7]">
              Full-Stack Developer (MERN)

              Building scalable APIs, authentication systems, and real-world web applications.

              Open to Backend / Full-Stack roles (Internship & Full-time)

              • Immediate Joiner
            </p>
            <div className="flex flex-wrap gap-[12px] mt-[99px]" aria-label="Primary actions">
              <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[#15171a] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#ffffff] bg-[#15171a] hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" onClick={() => scrollToSection("#projects")}>View projects</a>
              <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[#15171a] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#15171a] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="Prince_Kumar_Resume.pdf">Resume</a>
              <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[#15171a] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#15171a] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="mailto:parag31ja@gmail.com?subject=Reaching out from your Portfolio!">Hire me</a>
              <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[#15171a] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#15171a] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="https://github.com/AnakinCodeWalker/">GitHub</a>
              <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[#15171a] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#15171a] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="https://www.linkedin.com/in/princekumar3111">LinkedIn</a>
            </div>
          </div>
          <aside className="grid gap-[16px] p-[22px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] shadow-[0_20px_60px_rgba(22,38,35,0.12)] animate-[riseIn_720ms_ease-out_220ms_both]" aria-label="Profile summary">
            <div className="relative overflow-hidden p-[20px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] before:absolute before:inset-y-0 before:left-0 before:w-[4px] before:bg-[#0f766e] before:opacity-65">
              <span className="block text-[#c45f2c] text-[2rem] font-extrabold">0-1 yr</span>
              <span className="block mt-[4px] text-[#5d6571] leading-[1.5]">building FullStack projects</span>
            </div>
            <div className="relative overflow-hidden p-[20px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] before:absolute before:inset-y-0 before:left-0 before:w-[4px] before:bg-[#0f766e] before:opacity-65">
              <span className="block text-[#c45f2c] text-[2rem] font-extrabold">99+</span>
              <span className="block mt-[4px] text-[#5d6571] leading-[1.5]">students mentored at ACM HIT</span>
            </div>
            <div className="relative overflow-hidden p-[20px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] before:absolute before:inset-y-0 before:left-0 before:w-[4px] before:bg-[#0f766e] before:opacity-65">
              <span className="block text-[#c45f2c] text-[2rem] font-extrabold">40%</span>
              <span className="block mt-[4px] text-[#5d6571] leading-[1.5]">engagement boost in chapter work</span>
            </div>
            <div className="relative overflow-hidden p-[20px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] before:absolute before:inset-y-0 before:left-0 before:w-[4px] before:bg-[#0f766e] before:opacity-65">
              <span className="block text-[#c45f2c] text-[2rem] font-extrabold">840+</span>
              <span className="block mt-[4px] text-[#5d6571] leading-[1.5]">LinkedIn followers and growing network</span>
            </div>
          </aside>
        </section>

        {/* About */}
        <section className="px-[clamp(20px,5vw,72px)] py-[clamp(60px,8vw,100px)] bg-[#eef3f1] grid grid-cols-[minmax(260px,0.9fr)_minmax(260px,1.1fr)] gap-[clamp(28px,5vw,70px)] max-[900px]:grid-cols-1 reveal-target opacity-0 translate-y-[18px] transition-[opacity,transform] duration-300 ease-out will-change-[transform,opacity]">
          <div className="max-w-[850px] mb-[34px]">
            <p className="m-0 mb-[14px] text-[#0b4f4a] text-[0.78rem] font-extrabold uppercase tracking-normal">About</p>
            <h2 className="mt-0 mb-[18px] text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.05] tracking-normal font-bold">Building toward FullStack internships, junior developer roles, and freelance work.</h2>
          </div>
          <p className="mt-0 text-[#5d6571] leading-[1.7]">
            I’m a B.Tech IT student focused on building real-world web systems — from authentication and APIs to real-time applications.

            I prefer practical development: designing backend architecture, structuring APIs, and solving real product problems.

            Most of my learning comes from building, debugging, and improving systems continuously.
          </p>
        </section>

        {/* Projects */}
        <section id="projects" className="px-[clamp(20px,5vw,72px)] py-[clamp(60px,8vw,100px)] reveal-target opacity-0 translate-y-[18px] transition-[opacity,transform] duration-300 ease-out will-change-[transform,opacity]">
          <div className="max-w-[850px] mb-[34px]">
            <p className="m-0 mb-[14px] text-[#0b4f4a] text-[0.78rem] font-extrabold uppercase tracking-normal">Featured work</p>
            <h2 className="mt-0 mb-[18px] text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.05] tracking-normal font-bold">Systems that show how I think through FullStack problems.</h2>
          </div>

          <div className="grid gap-[22px]">
            {/* Project 1 */}
            <article className="relative grid grid-cols-[74px_minmax(0,1fr)_minmax(220px,0.38fr)] gap-[clamp(18px,3vw,34px)] items-stretch p-[clamp(22px,4vw,34px)] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] overflow-hidden transition-all duration-220 hover:border-[#0f766e]/45 hover:shadow-[0_18px_44px_rgba(22,38,35,0.1)] hover:-translate-y-[5px] before:absolute before:inset-y-0 before:left-0 before:w-[6px] before:bg-gradient-to-b before:from-[#0f766e] before:to-[#c45f2c] before:opacity-90 max-[900px]:grid-cols-1 reveal-target opacity-0 translate-y-[18px]">
              <span className="text-[#0f766e]/20 text-[clamp(2.8rem,7vw,4.8rem)] font-extrabold leading-[0.85]">01</span>
              <div className="max-w-[820px]">
                <div className="flex flex-wrap gap-[8px] items-start mb-[14px]">
                  <span className="px-[9px] py-[6px] text-[#3169a8] text-[0.78rem] font-extrabold bg-[#edf5fb] rounded-full">MERN EdTech</span>
                  <span className="px-[9px] py-[6px] text-[#c45f2c] text-[0.78rem] font-extrabold bg-[#fff0e8] rounded-full">FullStack platform</span>
                </div>
                <h3 className="mt-0 mb-[14px] text-[clamp(1.7rem,4vw,3rem)] leading-none font-bold">StudyNotion</h3>
                <p className="mt-0 max-w-[760px] text-[1.02rem] text-[#5d6571] leading-[1.7]">
                  A multi-role learning platform for course discovery, enrollment workflows, instructor dashboards, and protected student experiences.
                </p>
                <ul className="grid gap-[10px] my-[6px] mb-[22px] pl-[18px] text-[#5d6571] leading-[1.6]">
                  <li>Built authenticated course flows with REST APIs, protected routes, and MongoDB data models.</li>
                  <li>Separated frontend routes, UI components, service layers, and backend controllers for easier maintenance.</li>
                  <li>Implemented state-driven dashboard views for learners and course management workflows.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-[18px] justify-between pl-[clamp(0px,2vw,22px)] border-l border-[#d7dedb] max-[900px]:pl-0 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:pt-[18px]">
                <div className="flex flex-wrap gap-[8px] mt-auto">
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">React</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Redux</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Node.js</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Express.js</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">MongoDB</span>

                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Zod</span>

                </div>
                <div className='flex gap-5'>
                  <a className="inline-flex w-fit min-h-[42px] items-center justify-center px-[14px] py-[10px] text-[#ffffff] font-extrabold bg-[#15171a] rounded-[8px] transition-all duration-180 hover:bg-[#0b4f4a] hover:-translate-y-[2px]" href="https://github.com/AnakinCodeWalker/Projects/tree/master/newProject">Live Demo</a>

                  <a className="inline-flex w-fit min-h-[42px] items-center justify-center px-[14px] py-[10px] text-[#ffffff] font-extrabold bg-[#15171a] rounded-[8px] transition-all duration-180 hover:bg-[#0b4f4a] hover:-translate-y-[2px]" href="https://github.com/AnakinCodeWalker/Projects/tree/master/newProject">View GitHub</a>

                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="relative grid grid-cols-[74px_minmax(0,1fr)_minmax(220px,0.38fr)] gap-[clamp(18px,3vw,34px)] items-stretch p-[clamp(22px,4vw,34px)] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] overflow-hidden transition-all duration-220 hover:border-[#0f766e]/45 hover:shadow-[0_18px_44px_rgba(22,38,35,0.1)] hover:-translate-y-[5px] before:absolute before:inset-y-0 before:left-0 before:w-[6px] before:bg-gradient-to-b before:from-[#0f766e] before:to-[#c45f2c] before:opacity-90 max-[900px]:grid-cols-1 reveal-target opacity-0 translate-y-[18px] delay-[90ms]">
              <span className="text-[#0f766e]/20 text-[clamp(2.8rem,7vw,4.8rem)] font-extrabold leading-[0.85]">02</span>
              <div className="max-w-[820px]">
                <div className="flex flex-wrap gap-[8px] items-start mb-[14px]">
                  <span className="px-[9px] py-[6px] text-[#3169a8] text-[0.78rem] font-extrabold bg-[#edf5fb] rounded-full">Real-time app</span>
                  <span className="px-[9px] py-[6px] text-[#c45f2c] text-[0.78rem] font-extrabold bg-[#fff0e8] rounded-full">Communication system</span>
                </div>
                <h3 className="mt-0 mb-[14px] text-[clamp(1.7rem,4vw,3rem)] leading-none font-bold">Streamify</h3>
                <p className="mt-0 max-w-[760px] text-[1.02rem] text-[#5d6571] leading-[1.7]">
                  A collaboration product with authenticated sessions, chat workflows, video meeting capabilities, and protected backend APIs.
                </p>
                <ul className="grid gap-[10px] my-[6px] mb-[22px] pl-[18px] text-[#5d6571] leading-[1.6]">
                  <li>Built frontend and backend services with Vite, React, Express, Mongoose, and Stream APIs.</li>
                  <li>Used React Query, routing, auth tokens, Helmet, Zod, and protected endpoints.</li>
                  <li>Organized the app around clear API boundaries and real-time user workflows.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-[18px] justify-between pl-[clamp(0px,2vw,22px)] border-l border-[#d7dedb] max-[900px]:pl-0 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:pt-[18px]">
                <div className="flex flex-wrap gap-[8px] mt-auto">
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Node.js</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Express js</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">React</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Stream SDK</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">React Query</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">MongoDB</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Zod</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">JWT</span>

                </div>
                <div className='flex gap-5'>
                  <a className="inline-flex w-fit min-h-[42px] items-center justify-center px-[14px] py-[10px] text-[#ffffff] font-extrabold bg-[#15171a] rounded-[8px] transition-all duration-180 hover:bg-[#0b4f4a] hover:-translate-y-[2px]" href="https://streamify-live.onrender.com/">Live Demo</a>
                  <a className="inline-flex w-fit min-h-[42px] items-center justify-center px-[14px] py-[10px] text-[#ffffff] font-extrabold bg-[#15171a] rounded-[8px] transition-all duration-180 hover:bg-[#0b4f4a] hover:-translate-y-[2px]" href="https://github.com/AnakinCodeWalker/Projects/tree/master/STREAMIFY">View GitHub</a>

                </div>
              </div>
            </article>

            {/* Project 3 */}
            <article className="relative grid grid-cols-[74px_minmax(0,1fr)_minmax(220px,0.38fr)] gap-[clamp(18px,3vw,34px)] items-stretch p-[clamp(22px,4vw,34px)] bg-[#ffffff] border border-[#d7dedb] rounded-[8px] overflow-hidden transition-all duration-220 hover:border-[#0f766e]/45 hover:shadow-[0_18px_44px_rgba(22,38,35,0.1)] hover:-translate-y-[5px] before:absolute before:inset-y-0 before:left-0 before:w-[6px] before:bg-gradient-to-b before:from-[#0f766e] before:to-[#c45f2c] before:opacity-90 max-[900px]:grid-cols-1 reveal-target opacity-0 translate-y-[18px] delay-[180ms]">
              <span className="text-[#0f766e]/20 text-[clamp(2.8rem,7vw,4.8rem)] font-extrabold leading-[0.85]">03</span>
              <div className="max-w-[820px]">
                <div className="flex flex-wrap gap-[8px] items-start mb-[14px]">
                  <span className="px-[9px] py-[6px] text-[#3169a8] text-[0.78rem] font-extrabold bg-[#edf5fb] rounded-full">Auth service</span>
                  <span className="px-[9px] py-[6px] text-[#c45f2c] text-[0.78rem] font-extrabold bg-[#fff0e8] rounded-full">Backend API</span>
                </div>
                <h3 className="mt-0 mb-[14px] text-[clamp(1.7rem,4vw,3rem)] leading-none font-bold">AuthSystem</h3>
                <p className="mt-0 max-w-[760px] text-[1.02rem] text-[#5d6571] leading-[1.7]">
                  An identity and access backend with email verification, access/refresh JWT lifecycle, secure password handling, validation, and API documentation.
                </p>
                <ul className="grid gap-[10px] my-[6px] mb-[22px] pl-[18px] text-[#5d6571] leading-[1.6]">
                  <li>Designed signup, email verification, login, refresh token, current user, and logout routes.</li>
                  <li>Used modular controllers, middleware, models, validation, utilities, and consistent error handling.</li>
                  <li>Documented security flows and API behavior for testing and technical discussion.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-[18px] justify-between pl-[clamp(0px,2vw,22px)] border-l border-[#d7dedb] max-[900px]:pl-0 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:pt-[18px]">
                <div className="flex flex-wrap gap-[8px] mt-auto">
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Node.js</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Express.js</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">JWT</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">bcrypt</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Zod</span>
                  <span className="px-[10px] py-[7px] text-[#0b4f4a] text-[0.82rem] font-bold bg-[#e4f1ee] rounded-full">Nodemailer</span>
                </div>

                <div className='flex gap-5'>
                  <a className="inline-flex w-fit min-h-[42px] items-center justify-center px-[14px] py-[10px] text-[#ffffff] font-extrabold bg-[#15171a] rounded-[8px] transition-all duration-180 hover:bg-[#0b4f4a] hover:-translate-y-[2px]" href="https://github.com/AnakinCodeWalker/Projects/tree/master/AuthSystem">Live Demo</a>

                  <a className="inline-flex w-fit min-h-[42px] items-center justify-center px-[14px] py-[10px] text-[#ffffff] font-extrabold bg-[#15171a] rounded-[8px] transition-all duration-180 hover:bg-[#0b4f4a] hover:-translate-y-[2px]" href="https://github.com/AnakinCodeWalker/Projects/tree/master/AuthSystem">View GitHub</a>

                </div>
              </div>
            </article>
          </div>

          <div className="mt-[24px]">
            <a className="relative text-[#0b4f4a] font-extrabold hover:text-[#0f766e] text-link-hover" href="https://github.com/AnakinCodeWalker/Projects">View full GitHub projects repository</a>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="px-[clamp(20px,5vw,72px)] py-[clamp(60px,8vw,100px)] bg-[#eef3f1] reveal-target opacity-0 translate-y-[18px] transition-[opacity,transform] duration-300 ease-out will-change-[transform,opacity]">
          <div className="max-w-[950px] mb-[34px]">
            <p className="m-0 mb-[14px] text-[#0b4f4a] text-[0.78rem] font-extrabold uppercase tracking-normal">Experience</p>
            <h2 className="mt-0 mb-[18px] text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.05] tracking-normal font-bold">Campus leadership, open-source contributions, and real-world web development.</h2>
          </div>
          <div className="grid gap-[18px]">
            <article className="grid grid-cols-[minmax(150px,190px)_minmax(240px,1fr)] gap-[18px] items-start py-[22px] border-t border-[#d7dedb] transition-all duration-180 hover:border-[#0f766e]/50 hover:translate-x-[4px] max-[680px]:grid-cols-1 max-[680px]:gap-[8px] reveal-target opacity-0 translate-y-[18px]">
              <span className="text-[#c45f2c] text-[0.9rem] font-extrabold">Oct 2025 - Present</span>
              <div>
                <h3 className="mt-0 mb-[10px] text-[1.05rem] font-bold">Web Developer, ACM Student Chapter HIT</h3>
                <p className="mt-0 text-[#5d6571] leading-[1.7] max-[680px]:col-auto">Mentored 99+ students in JavaScript and React, driving 40% higher engagement through practical sessions.</p>
              </div>
            </article>
            <article className="grid grid-cols-[minmax(150px,190px)_minmax(240px,1fr)] gap-[18px] items-start py-[22px] border-t border-[#d7dedb] transition-all duration-180 hover:border-[#0f766e]/50 hover:translate-x-[4px] max-[680px]:grid-cols-1 max-[680px]:gap-[8px] reveal-target opacity-0 translate-y-[18px] delay-[90ms]">
              <span className="text-[#c45f2c] text-[0.9rem] font-extrabold">Jan 2026 - Present</span>
              <div>
                <h3 className="mt-0 mb-[10px] text-[1.05rem] font-bold">Open Source Contributor, Open Source Connect</h3>
                <p className="mt-0 text-[#5d6571] leading-[1.7] max-[680px]:col-auto">Contributed to MERN projects while using Git, Agile collaboration, Docker, and practical issue-based workflows.</p>
              </div>
            </article>
            <article className="grid grid-cols-[minmax(150px,190px)_minmax(240px,1fr)] gap-[18px] items-start py-[22px] border-t border-[#d7dedb] transition-all duration-180 hover:border-[#0f766e]/50 hover:translate-x-[4px] max-[680px]:grid-cols-1 max-[680px]:gap-[8px] reveal-target opacity-0 translate-y-[18px] delay-[180ms]">
              <span className="text-[#c45f2c] text-[0.9rem] font-extrabold">Aug 2025 - Jan 2026</span>
              <div>
                <h3 className="mt-0 mb-[10px] text-[1.05rem] font-bold">Web Development Intern, GAOTek Inc.</h3>
                <p className="mt-0 text-[#5d6571] leading-[1.7] max-[680px]:col-auto">Worked on WordPress updates, SEO improvements, and page speed optimization for web properties.</p>
              </div>
            </article>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="px-[clamp(20px,5vw,72px)] py-[clamp(60px,8vw,100px)]
  grid grid-cols-[minmax(240px,0.75fr)_minmax(990px,1.25fr)]
  gap-[clamp(48px,6vw,100px)]
  max-[900px]:grid-cols-1
  reveal-target opacity-0 translate-y-[18px]
  transition-[opacity,transform] duration-300 ease-out will-change-[transform,opacity]"
        >
          {/* LEFT SIDE */}
          <div className="max-w-[850px] mb-[34px] pr-[20px] md:pr-[40px]">
            <p className="m-0 mb-[14px] text-[#0b4f4a] text-[0.78rem] font-extrabold uppercase">
              Skills
            </p>

            <h2 className="mt-0 mb-[26px] text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.05] font-bold">
              Technologies I use to build and scale web applications.
            </h2>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 gap-[24px] md:gap-[28px] max-[680px]:grid-cols-1">

            <article className="p-[24px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mb-[10px] text-[1.05rem] font-bold">Languages</h3>
              <p className="text-[#5d6571] leading-[1.8]">
                JavaScript, TypeScript, Java
              </p>
            </article>

            <article className="p-[24px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mb-[10px] text-[1.05rem] font-bold">Frontend</h3>
              <p className="text-[#5d6571] leading-[1.8]">
                React.js, HTML5, CSS3, Tailwind CSS
              </p>
            </article>

            <article className="p-[24px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mb-[10px] text-[1.05rem] font-bold">Backend</h3>
              <p className="text-[#5d6571] leading-[1.8]">
                Node.js, Express.js, REST APIs, JWT, WebSockets
              </p>
            </article>

            <article className="p-[24px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mb-[10px] text-[1.05rem] font-bold">Databases</h3>
              <p className="text-[#5d6571] leading-[1.8]">
                MongoDB, Mongoose, PostgreSQL, Prisma
              </p>
            </article>

            <article className="p-[24px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mb-[10px] text-[1.05rem] font-bold">Dev tools</h3>
              <p className="text-[#5d6571] leading-[1.8]">
                Git, GitHub, Docker, VS Code, Postman, WSL
              </p>
            </article>

            <article className="p-[24px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mb-[10px] text-[1.05rem] font-bold">Integrations</h3>
              <p className="text-[#5d6571] leading-[1.8]">
                Nodemailer, Stream SDK, WebRTC, bcrypt, JWT, Swagger
              </p>
            </article>

          </div>
        </section>

        {/* Education & Certs */}
        <section className="px-[clamp(20px,5vw,72px)] py-[clamp(60px,8vw,100px)] bg-[#eef3f1] reveal-target opacity-0 translate-y-[18px] transition-[opacity,transform] duration-300 ease-out will-change-[transform,opacity]">
          <div className="max-w-[850px] mb-[34px]">
            <p className="m-0 mb-[14px] text-[#0b4f4a] text-[0.78rem] font-extrabold uppercase tracking-normal">Education and certifications</p>
            <h2 className="mt-0 mb-[18px] text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.05] tracking-normal font-bold">Current study backed by hands-on web development learning.</h2>
          </div>
          <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
            <article className="p-[20px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mt-0 mb-[10px] text-[1.05rem] font-bold">Haldia Institute of Technology</h3>
              <p className="mt-0 text-[#5d6571] leading-[1.7]">B.Tech in Information Technology, CGPA 8.0, 2024 - 2027 expected</p>
            </article>
            <article className="p-[20px] bg-[#ffffff] border border-[#d7dedb] rounded-[8px]">
              <h3 className="mt-0 mb-[10px] text-[1.05rem] font-bold">Government Polytechnic, Khutri</h3>
              <p className="mt-0 text-[#5d6571] leading-[1.7]">Diploma in Computer Engineering, 75%, 2021 - 2024</p>
            </article>
            <article className="col-span-full p-0 bg-transparent border-0 mt-[18px]">
              <h3 className="mt-0 mb-[10px] text-[1.05rem] font-bold">Certifications</h3>
              <div className="grid grid-cols-3 gap-[14px] max-[900px]:grid-cols-1">
                <a className="grid min-h-[140px] content-between p-[16px] text-[#15171a] bg-gradient-to-br from-[#ffffff] to-[#fff4ed] border border-[rgba(196,95,44,0.35)] rounded-[8px] transition-all duration-200 hover:border-[#0f766e] hover:shadow-[0_14px_34px_rgba(22,38,35,0.1)] hover:-translate-y-[2px]" href="https://verify.skilljar.com/c/az6pocr7hxy2">
                  <span className="w-fit px-[8px] py-[5px] text-[#8f3f19] text-[0.75rem] font-extrabold bg-[#fde8dc] rounded-full">Verified</span>
                  <strong className="mt-[18px] leading-[1.25]">API Beginner Learning Path</strong>
                  <small className="mt-[10px] text-[#5d6571] leading-[1.4]">Postman Academy</small>
                </a>
                <a className="grid min-h-[140px] content-between p-[16px] text-[#15171a] bg-gradient-to-br from-[#ffffff] to-[#f3f8f6] border border-[#d7dedb] rounded-[8px] transition-all duration-200 hover:border-[#0f766e] hover:shadow-[0_14px_34px_rgba(22,38,35,0.1)] hover:-translate-y-[2px]" href="https://ude.my/UC-06e6b2e8-4d7b-48d5-afc5-834d833d1284">
                  <span className="w-fit px-[8px] py-[5px] text-[#0b4f4a] text-[0.75rem] font-extrabold bg-[#e4f1ee] rounded-full">Udemy</span>
                  <strong className="mt-[18px] leading-[1.25]">Docker Containers</strong>
                  <small className="mt-[10px] text-[#5d6571] leading-[1.4]">Issued Feb. 1, 2026</small>
                </a>
                <a className="grid min-h-[140px] content-between p-[16px] text-[#15171a] bg-gradient-to-br from-[#ffffff] to-[#f3f8f6] border border-[#d7dedb] rounded-[8px] transition-all duration-200 hover:border-[#0f766e] hover:shadow-[0_14px_34px_rgba(22,38,35,0.1)] hover:-translate-y-[2px]" href="https://media.geeksforgeeks.org/courses/certificates/14c3ed2b3b7ee4f94911761ee77e14f7.pdf">
                  <span className="w-fit px-[8px] py-[5px] text-[#0b4f4a] text-[0.75rem] font-extrabold bg-[#e4f1ee] rounded-full">GFG</span>
                  <strong className="mt-[18px] leading-[1.25]">Java Programming</strong>
                  <small className="mt-[10px] text-[#5d6571] leading-[1.4]">Certificate PDF</small>
                </a>
                <a className="grid min-h-[140px] content-between p-[16px] text-[#15171a] bg-gradient-to-br from-[#ffffff] to-[#f3f8f6] border border-[#d7dedb] rounded-[8px] transition-all duration-200 hover:border-[#0f766e] hover:shadow-[0_14px_34px_rgba(22,38,35,0.1)] hover:-translate-y-[2px]" href="https://ude.my/UC-10d7cda6-6f2b-4768-9526-102ba23f0999">
                  <span className="w-fit px-[8px] py-[5px] text-[#0b4f4a] text-[0.75rem] font-extrabold bg-[#e4f1ee] rounded-full">Udemy</span>
                  <strong className="mt-[18px] leading-[1.25]">Prompt Engineering and Gen AI</strong>
                  <small className="mt-[10px] text-[#5d6571] leading-[1.4]">Issued Aug. 3, 2025</small>
                </a>
                <a className="grid min-h-[140px] content-between p-[16px] text-[#15171a] bg-gradient-to-br from-[#ffffff] to-[#f3f8f6] border border-[#d7dedb] rounded-[8px] transition-all duration-200 hover:border-[#0f766e] hover:shadow-[0_14px_34px_rgba(22,38,35,0.1)] hover:-translate-y-[2px]" href="https://www.linkedin.com/in/princekumar3111/details/certifications/">
                  <span className="w-fit px-[8px] py-[5px] text-[#0b4f4a] text-[0.75rem] font-extrabold bg-[#e4f1ee] rounded-full">LinkedIn</span>
                  <strong className="mt-[18px] leading-[1.25]">Open Source Contribution Workshop</strong>
                  <small className="mt-[10px] text-[#5d6571] leading-[1.4]">Certification record</small>
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-[clamp(20px,5vw,72px)] py-[clamp(60px,8vw,100px)] grid grid-cols-[minmax(260px,0.95fr)_minmax(260px,1.05fr)] gap-[clamp(24px,5vw,60px)] items-center text-[#ffffff] bg-[#15171a] max-[900px]:grid-cols-1 reveal-target opacity-0 translate-y-[18px] transition-[opacity,transform] duration-300 ease-out will-change-[transform,opacity]">
          <div>
            <p className="m-0 mb-[14px] text-[#a8d9d1] text-[0.78rem] font-extrabold uppercase tracking-normal">Contact</p>
            <h2 className="mt-0 mb-[18px] text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.05] tracking-tight font-bold">
              Let's build something great together.
            </h2>
            <p className="mt-0 text-[#a8d9d1] text-[1.1rem] leading-[1.6] max-w-[500px]">
              Currently open for Full-Stack and Backend roles, and available to join immediately.
            </p>
            <p className="mt-[24px] text-[#a8d9d1]/70 text-[0.9rem] flex items-center gap-2">
              📍 Haldia, West Bengal, India
            </p>
          </div>

          <div className="flex flex-wrap gap-[12px] max-[900px]:mt-[12px]">
            <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[rgba(255,255,255,0.4)] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#15171a] bg-[#ffffff] hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="mailto:parag31ja@gmail.com?subject=Reaching out from your Portfolio!">Gmail</a>
            <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[rgba(255,255,255,0.4)] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#ffffff] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="Prince_Kumar_Resume.pdf">Resume</a>
            <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[rgba(255,255,255,0.4)] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#ffffff] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="tel:+916209673251">Contact</a>
            <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[rgba(255,255,255,0.4)] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#ffffff] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="https://github.com/AnakinCodeWalker/">GitHub</a>
            <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[rgba(255,255,255,0.4)] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#ffffff] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="https://github.com/AnakinCodeWalker/Projects">Projects</a>
            <a className="inline-flex min-h-[46px] items-center justify-center px-[18px] py-[12px] border border-[rgba(255,255,255,0.4)] rounded-[8px] font-extrabold leading-[1.2] transition-all duration-180 text-[#ffffff] bg-transparent hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(21,23,26,0.12)] max-[680px]:w-full" href="https://www.linkedin.com/in/princekumar3111">LinkedIn</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="grid gap-[8px] justify-items-center px-[20px] pt-[38px] pb-[48px] text-[#5d6571] bg-[#fbfaf7] border-t border-[#d7dedb]" aria-label="Portfolio signature">
          <span className="text-[0.86rem] font-bold uppercase">Designed, built, and signed by</span>
          <strong className="text-[#15171a] font-['Segoe_Script','Brush_Script_MT',cursive] text-[clamp(2.3rem,6vw,4.7rem)] font-bold leading-none">Prince Kumar</strong>
        </footer>
      </main>
    </div>
  );
}