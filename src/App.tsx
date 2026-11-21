import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Code2, Cpu, Github,
  Linkedin, Mail, Menu, X, Sparkles, Terminal, Database, Globe, ExternalLink,
  GraduationCap, Layers3, FileDown,
} from 'lucide-react'

type Project = {
  number: string; title: string; category: string; description: string;
  stack: string[]; icon: typeof BrainCircuit; status: string; accent: string; githubUrl?: string;
}

const projects: Project[] = [
  {
    number: '01', title: 'DevMind AI', category: 'AI · Developer Tools',
    description: 'An AI-powered developer assistant focused on making code easier to understand and work with through intelligent analysis and LLM-powered assistance.',
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'LLM APIs'], icon: BrainCircuit,
    status: 'In development', accent: 'violet',
  },
  {
    number: '02', title: 'AI PDF Summarizer', category: 'AI · NLP',
    description: 'A document-processing tool that extracts text from lengthy PDFs and generates concise summaries using Large Language Models.',
    stack: ['Python', 'NLP', 'LLM Integration'], icon: Layers3,
    status: 'Built project', accent: 'cyan', githubUrl: 'https://github.com/Akshay1917/AI-PDF-Summarizer-Project',
  },
  {
    number: '03', title: 'Multi-Sensor Health Monitor', category: 'IoT · Embedded Systems',
    description: 'An ESP32-based prototype combining sensor readings, an OLED interface, and alerts for real-time health parameter monitoring.',
    stack: ['ESP32', 'MAX30100', 'Arduino', 'Blynk'], icon: Cpu,
    status: 'Prototype', accent: 'green', githubUrl: 'https://github.com/Akshay1917/Smart-IoT-Health-Monitoring-System',
  },
  {
    number: '04', title: 'CNN Eye Detection', category: 'Computer Vision · Deep Learning',
    description: 'A computer-vision project exploring CNN-based eye detection with image processing and model execution workflows.',
    stack: ['Python', 'TensorFlow / Keras', 'OpenCV', 'CNN'], icon: Code2,
    status: 'Model experimentation', accent: 'orange',
  },
  {
    number: '05', title: 'Student Management System', category: 'Full Stack · Database Applications',
    description: 'A database-driven student management application developed as part of a full-stack management suite.',
    stack: ['Python', 'Flask', 'MySQL', 'HTML / CSS', 'JavaScript'], icon: Database,
    status: 'Built project', accent: 'cyan', githubUrl: 'https://github.com/Akshay1917/student-management-system',
  },
  {
    number: '06', title: 'Vehicle Rental System', category: 'Full Stack · Database Applications',
    description: 'A web-based vehicle rental application built with a relational database and full-stack web technologies.',
    stack: ['Python', 'Flask', 'MySQL', 'HTML / CSS', 'JavaScript'], icon: Globe,
    status: 'Built project', accent: 'violet', githubUrl: 'https://github.com/Akshay1917/vehicle-rental-system',
  },
  {
    number: '07', title: 'ESP32 IoT Home Automation', category: 'IoT · Embedded Systems',
    description: 'A smart-home control project using custom ESP32 firmware to remotely manage household appliances through cloud triggers.',
    stack: ['C++', 'ESP32', 'Arduino', 'Cloud Triggers'], icon: Cpu,
    status: 'Built project', accent: 'green', githubUrl: 'https://github.com/Akshay1917/ESP32-IoT-Home-Automation',
  },
]

const skillGroups = [
  { title: 'Programming', icon: Terminal, items: ['Python', 'Java', 'JavaScript', 'SQL'] },
  { title: 'Frontend', icon: Globe, items: ['React', 'TypeScript', 'HTML5', 'CSS3'] },
  { title: 'Backend & Data', icon: Database, items: ['FastAPI', 'Node.js', 'REST APIs', 'MySQL'] },
  { title: 'AI & Emerging Tech', icon: BrainCircuit, items: ['Machine Learning', 'CNN', 'OpenCV', 'LLM APIs', 'IoT', 'ESP32'] },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}


function downloadResume() {
  window.print()
}

function WaterRippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || isTouch) return

    type Ripple = { x: number; y: number; radius: number; alpha: number }
    const ripples: Ripple[] = []
    let frame = 0
    let width = 0
    let height = 0
    let lastPointerAt = 0
    let lastX = -1000
    let lastY = -1000
    let disposed = false

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const addRipple = (x: number, y: number, strength = 1) => {
      ripples.push({ x, y, radius: 3, alpha: 0.34 * strength })
      if (ripples.length > 7) ripples.shift()
    }
    const draw = () => {
      if (disposed) return
      context.clearRect(0, 0, width, height)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]
        ripple.radius += 1.35
        ripple.alpha *= 0.972
        if (ripple.alpha < 0.018 || ripple.radius > 145) {
          ripples.splice(i, 1)
          continue
        }
        for (let ring = 0; ring < 3; ring++) {
          const radius = ripple.radius - ring * 10
          if (radius <= 0) continue
          context.beginPath()
          context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
          context.strokeStyle = `rgba(153, 177, 255, ${ripple.alpha * (1 - ring * 0.23)})`
          context.lineWidth = ring === 0 ? 1.2 : 0.7
          context.stroke()
        }
      }
      if (ripples.length) frame = requestAnimationFrame(draw)
      else frame = 0
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = host.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const distance = Math.hypot(x - lastX, y - lastY)
      const now = performance.now()
      if (distance > 24 && now - lastPointerAt > 42) {
        addRipple(x, y, Math.min(1.2, 0.75 + distance / 160))
        lastX = x
        lastY = y
        lastPointerAt = now
        if (!frame) frame = requestAnimationFrame(draw)
      }
    }
    const onClick = (event: MouseEvent) => {
      const bounds = host.getBoundingClientRect()
      addRipple(event.clientX - bounds.left, event.clientY - bounds.top, 1.35)
      if (!frame) frame = requestAnimationFrame(draw)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('click', onClick)
    return () => {
      disposed = true
      observer.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('click', onClick)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return <canvas ref={canvasRef} className="water-ripple-canvas" aria-hidden="true" />
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'AI / ML', 'Full Stack', 'IoT']
  const visibleProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'AI / ML') return /AI|NLP|Computer Vision|Deep Learning/.test(project.category)
    if (activeFilter === 'Full Stack') return project.title === 'DevMind AI'
    return project.category.includes('IoT')
  })

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">A<span>.</span></span><span>AKSHAY<span className="brand-sub"> / PORTFOLIO</span></span></a>
        <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <WaterRippleCanvas />
          <div className="hero-copy">
            <motion.div className="eyebrow" initial="hidden" animate="visible" variants={fadeUp}><span className="status-dot" /> OPEN TO INTERNSHIPS & OPPORTUNITIES</motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.08 }}>Building ideas<br />into <span className="gradient-text">intelligent</span><br />experiences<span className="period">.</span></motion.h1>
            <motion.p className="hero-description" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.16 }}>I'm Akshay — an AI & Machine Learning engineering student and Python developer interested in building useful products with intelligent technology.</motion.p>
            <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.24 }}>
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-ghost" href="#contact">Get in touch <ArrowRight size={16} /></a><button className="button button-resume" onClick={() => void downloadResume()}><FileDown size={16} /> Download Resume</button>
            </motion.div>
            <motion.div className="social-row" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}>
              <a href="https://github.com/Akshay1917" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={12} /></a>
              <a href="https://www.linkedin.com/in/akshay-v-215466394/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={12} /></a>
            </motion.div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="visual-grid" />
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="core-card"><div className="core-top"><span className="tiny-label">CURRENT FOCUS</span><span className="live-pill"><i /> BUILDING</span></div><div className="core-icon"><BrainCircuit size={42} strokeWidth={1.25} /></div><div className="core-title">Human ideas.<br /><span>Machine intelligence.</span></div><div className="core-code"><span>const</span> future = <b>build()</b><i>;</i></div></div>
            <div className="float-chip chip-one"><Code2 size={15} /> Python</div><div className="float-chip chip-two"><Sparkles size={15} /> AI / ML</div><div className="float-chip chip-three"><Cpu size={15} /> IoT</div>
            <div className="visual-caption">01 — THINK · BUILD · ITERATE</div>
          </motion.div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section className="intro-strip"><div className="section-wrap strip-inner"><span>CURIOUS BY NATURE</span><span className="strip-line" /><span>ENGINEERING WITH PURPOSE</span><span className="strip-line" /><span>ALWAYS LEARNING</span></div></section>

        <section className="section-wrap section-block" id="about">
          <div className="section-heading"><div><span className="section-index">01 / ABOUT</span><h2>A little about <span className="gradient-text">me.</span></h2></div><p className="section-aside">The person behind the projects</p></div>
          <motion.div className="about-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={fadeUp}>
            <div className="about-main"><p className="about-lead">I enjoy working at the intersection of <span>software, intelligence, and real-world problem solving.</span></p><p className="muted-copy">I'm pursuing a B.E. in Artificial Intelligence and Machine Learning at Dayananda Sagar Academy of Technology and Management. My strongest programming language is Python, and I enjoy exploring how AI can become practical, helpful software.</p><p className="muted-copy">From experimenting with computer vision models to building full-stack AI tools and sensor-based prototypes, I like learning by making things. I'm focused on strengthening my engineering fundamentals and creating projects with real-world value.</p><div className="about-tags"><span>Problem solving</span><span>Research mindset</span><span>Hands-on learning</span></div></div>
            <div className="stats-grid"><div className="stat-card"><span className="stat-number">8.44<span>/10</span></span><span className="stat-label">ACADEMIC CGPA</span></div><div className="stat-card"><span className="stat-number">2028</span><span className="stat-label">EXPECTED GRADUATION</span></div><div className="stat-card stat-wide"><span className="stat-number stat-word">AI <i>+</i> CODE</span><span className="stat-label">AREAS I LOVE EXPLORING</span></div></div>
          </motion.div>
        </section>

        <section className="section-wrap section-block" id="skills">
          <div className="section-heading"><div><span className="section-index">02 / TOOLKIT</span><h2>Tools of my <span className="gradient-text">trade.</span></h2></div><p className="section-aside">Technologies I work with and explore</p></div>
          <div className="skills-grid">{skillGroups.map((group, index) => { const Icon = group.icon; return <motion.div className="skill-card" key={group.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.08 }}><div className="skill-card-head"><span className="skill-icon"><Icon size={19} /></span><span className="skill-count">0{index + 1}</span></div><h3>{group.title}</h3><div className="skill-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></motion.div> })}</div>
          <p className="skills-note"><Sparkles size={15} /> I believe tools matter — but understanding the problem matters more.</p>
        </section>

        <section className="projects-section" id="projects"><div className="section-wrap section-block"><div className="section-heading"><div><span className="section-index">03 / SELECTED WORK</span><h2>Things I've been <span className="gradient-text">building.</span></h2></div><p className="section-aside">Experiments, prototypes & ideas</p></div>
          <div className="project-toolbar"><p>A selection of projects across AI, software, and connected systems.</p><div className="filter-row">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div>
          <div className="projects-grid">{visibleProjects.map((project, index) => { const Icon = project.icon; return <motion.article className={`project-card accent-${project.accent}`} key={project.number} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6, scale: 1.012 }} transition={{ duration: 0.35, delay: index * 0.06 }}><div className="project-top"><span className="project-number">/{project.number}</span><span className="project-status">{project.status}</span></div><div className="project-icon"><Icon size={26} strokeWidth={1.5} /></div><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions">
              {project.githubUrl ? <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code on GitHub`}><Github size={15} /> View on GitHub <ArrowUpRight size={14} /></a> : <span className="project-link project-link-muted" aria-label="Repository link not yet available">Repository not linked yet</span>}
              <span className="project-number">/{project.number}</span>
            </div></motion.article> })}</div>
          <p className="project-disclaimer">Project status is labelled transparently. Some entries are prototypes or explorations rather than finished products.</p>
        </div></section>

        <section className="section-wrap section-block" id="education"><div className="section-heading"><div><span className="section-index">04 / EDUCATION</span><h2>Learning is a <span className="gradient-text">journey.</span></h2></div></div><motion.div className="education-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}><div className="education-icon"><GraduationCap size={27} /></div><div className="education-details"><span className="education-period">2024 — 2028 · EXPECTED</span><h3>Bachelor of Engineering</h3><p>Artificial Intelligence & Machine Learning</p><span className="education-school">Dayananda Sagar Academy of Technology and Management</span></div><div className="education-score"><strong>8.44</strong><span>CGPA / 10</span></div></motion.div></section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><span className="section-index">05 / CONTACT</span><div className="contact-content"><div><h2>Have an idea?<br /><span className="gradient-text">Let's build it.</span></h2><p>I'm interested in internships, collaborations, and opportunities to learn by solving meaningful problems.</p></div><a className="contact-email" href="mailto:av3289216@gmail.com"><span><Mail size={19} /> Send me an email</span><ArrowUpRight size={22} /></a><button className="contact-resume" onClick={downloadResume}><FileDown size={17} /> Download resume PDF</button></div><div className="contact-bottom"><span>BASED IN INDIA · OPEN TO OPPORTUNITIES</span><div><a href="https://github.com/Akshay1917" target="_blank" rel="noreferrer">GITHUB <ExternalLink size={12} /></a><a href="https://www.linkedin.com/in/akshay-v-215466394/" target="_blank" rel="noreferrer">LINKEDIN <ExternalLink size={12} /></a></div></div></div></section>
      </main>
      <footer className="footer section-wrap"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>AKSHAY<span className="brand-sub"> / PORTFOLIO</span></span></a><span>DESIGNED & BUILT WITH CURIOSITY © {new Date().getFullYear()}</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>

      <section className="print-resume" aria-label="Printable resume">
        <header className="print-header">
          <h1>AKSHAY</h1>
          <p className="print-subtitle">B.E. Artificial Intelligence &amp; Machine Learning | Python &amp; Full-Stack Developer</p>
          <p className="print-contact">+91 8277454931 &nbsp;|&nbsp; av3289216@gmail.com &nbsp;|&nbsp; github.com/Akshay1917 &nbsp;|&nbsp; linkedin.com/in/akshay-v-215466394</p>
        </header>
        <div className="print-section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>Third-year Artificial Intelligence and Machine Learning engineering student (CGPA: 8.44/10) with hands-on experience in Python, FastAPI, full-stack web development, and IoT edge computing. Proven ability to design modular software architectures, integrate Large Language Model (LLM) APIs, and build real-time hardware-software systems. Seeking software engineering or AI development opportunities to apply problem-solving skills and contribute to scalable technology solutions.</p>
        </div>
        <div className="print-section">
          <h2>EDUCATION</h2>
          <p><strong>Bachelor of Engineering (B.E.) in Artificial Intelligence and Machine Learning</strong> <span className="print-right">2024 – 2028 (Expected)</span></p>
          <p>Dayananda Sagar Academy of Technology and Management (DSATM), Bengaluru <span className="print-right">CGPA: 8.44 / 10.0</span></p>
        </div>
        <div className="print-section">
          <h2>TECHNICAL SKILLS</h2>
          <p><strong>Languages:</strong> Python, C++, C, Java, JavaScript, TypeScript, SQL</p>
          <p><strong>AI &amp; Machine Learning:</strong> LLM APIs, Generative AI, NLP, PyTorch, TensorFlow, Scikit-Learn, OpenCV, Pandas, NumPy</p>
          <p><strong>Web &amp; Backend:</strong> FastAPI, Flask, React.js, Node.js, HTML5, CSS3</p>
          <p><strong>Databases &amp; Tools:</strong> MySQL, Git, GitHub, Pytest, Ruff, VS Code, Arduino IDE</p>
          <p><strong>IoT &amp; Hardware:</strong> ESP32, Arduino, MAX30100 Sensor, OLED Displays, Blynk Cloud</p>
        </div>
        <div className="print-section">
          <h2>KEY PROJECTS</h2>
          <p><strong>DevMind AI – AI-Powered Developer Assistant</strong> <span className="print-tech">Python, FastAPI, React, TypeScript</span></p>
          <ul>
            <li>Architected a modular full-stack AI assistant designed to streamline software development workflows.</li>
            <li>Built high-performance backend API foundations using FastAPI and integrated automated testing with pytest.</li>
            <li>Enforced code quality and linting standards using Ruff alongside structured Git version control.</li>
          </ul>
          <p><strong>AI PDF Summarizer</strong> <span className="print-tech">Python, FastAPI, NLP, LLM APIs</span></p>
          <ul>
            <li>Engineered a document processing tool that extracts text from lengthy PDFs and generates concise summaries using Large Language Models.</li>
            <li>Built a backend workflow for document parsing and prompt optimization.</li>
          </ul>
          <p><strong>Smart IoT Health Monitoring System</strong> <span className="print-tech">C++, ESP32, MAX30100, OLED, Blynk</span></p>
          <ul>
            <li>Developed a real-time biometric telemetry prototype to monitor pulse rate and blood oxygen saturation (SpO2).</li>
            <li>Integrated the MAX30100 sensor with ESP32, displayed live metrics on an OLED screen, and explored cloud alerts.</li>
          </ul>
          <p><strong>Full-Stack Management Systems (Student &amp; Vehicle Rental Suites)</strong> <span className="print-tech">Python, Flask, MySQL, HTML/CSS, JavaScript</span></p>
          <ul>
            <li>Developed database-driven web applications with user authentication, administrative dashboards, automated reporting, and booking workflows.</li>
            <li>Designed relational database schemas in MySQL to support data integrity.</li>
          </ul>
          <p><strong>ESP32 IoT Home Automation</strong> <span className="print-tech">C++, ESP32, Arduino, Cloud Triggers</span></p>
          <ul><li>Built a smart-home control system using custom ESP32 firmware to remotely manage appliances via cloud triggers.</li></ul>
        </div>
        <div className="print-section">
          <h2>CORE COMPETENCIES</h2>
          <p><strong>Software Engineering:</strong> Modular Architecture, RESTful API Design, Automated Testing, Version Control</p>
          <p><strong>Professional Strengths:</strong> Analytical Problem-Solving, Rapid Prototyping, Team Collaboration, Self-Directed Learning</p>
        </div>
        <p className="print-note">To save this resume as a PDF, choose “Save as PDF” in the browser print dialog.</p>
      </section>
    </div>
  )
}

export default App
