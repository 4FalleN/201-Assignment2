import React, { useMemo, useState } from 'react'
import { company } from './data/company'
import { team } from './data/team'
import bridgeIllustration from './assets/bridge.svg'
function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY
    const diff = targetY - startY
    let start

    function step(timestamp) {
        if (!start) start = timestamp
        const time = timestamp - start
        const percent = Math.min(time / duration, 1)
        const ease = percent * (2 - percent) // easeOut
        window.scrollTo(0, startY + diff * ease)
        if (time < duration) {
            requestAnimationFrame(step)
        }
    }

    requestAnimationFrame(step)
}


function cx(...parts) {
    return parts.filter(Boolean).join(' ')
}

function useInlineSvgDataUri(svg) {
    return useMemo(() => {
        const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')
        return `data:image/svg+xml,${encoded}`
    }, [svg])
}

function Avatar({ src, alt }) {
    const placeholder = useInlineSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#7c3aed" offset="0"/>
          <stop stop-color="#06b6d4" offset="1"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="32" fill="url(#g)"/>
      <circle cx="200" cy="160" r="68" fill="rgba(255,255,255,0.92)"/>
      <path d="M92 340c24-64 74-96 108-96s84 32 108 96" fill="rgba(255,255,255,0.92)"/>
      <text x="200" y="386" text-anchor="middle" font-family="system-ui, -apple-system" font-size="16" fill="rgba(255,255,255,0.95)">Team</text>
    </svg>
  `)

    const [resolved, setResolved] = useState(src || placeholder)

    return (
        <img
            className="avatar"
            src={resolved}
            alt={alt}
            loading="lazy"
            onError={() => setResolved(placeholder)}
        />
    )
}

function Header({ onNavigate }) {
    const [open, setOpen] = useState(false)

    return (
        <header className="header">
            <a className="skip" href="#content">
                Skip to content
            </a>

            <div className="container headerInner">
                <a className="brand" href="#top" onClick={() => onNavigate?.()}>
                    <span className="brandMark" aria-hidden="true">
                        ⬡
                    </span>
                    <span className="brandText">
                        {company.nameEn} <span className="brandSub">Official Website</span>
                    </span>
                </a>

                <button
                    className="menuBtn hoverGuide hoverTip"
                    data-tip="Open navigation menu"
                    type="button"
                    aria-expanded={open}
                    aria-controls="siteNav"
                    onClick={() => setOpen((v) => !v)}
                >
                    Menu
                </button>

                <nav id="siteNav" className={cx('nav', open && 'navOpen')}>
                    {[
                        ['Services', 'services'],
                        ['About Us', 'about'],
                        ['Team', 'team'],
                        ['Media', 'media'],
                        ['Contact', 'contact'],
                    ].map(([label, id]) => (
                        <button
                            key={id}
                            type="button"
                            className="navLink hoverGuide hoverTip"
                            data-tip={`Go to ${label}`}
                            onClick={() => {
                                setOpen(false)

                                const el = document.getElementById(id)
                                if (el) {
                                    const y =
                                        el.getBoundingClientRect().top +
                                        window.pageYOffset -
                                        100
                                    smoothScrollTo(y, 900)
                                }
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </nav>


            </div>
        </header>
    )
}

function StatRow() {
    return (
        <div className="stats">
            {company.highlights.map((h) => (
                <div
                    key={h.label}
                    className="statCard hoverGuide hoverTip"
                    data-tip={`Highlight: ${h.label}`}
                >
                    <div className="statValue">{h.value}</div>
                    <div className="statLabel">{h.label}</div>
                </div>
            ))}
        </div>
    )
}

function Section({ id, eyebrow, title, children }) {
    return (
        <section id={id} className="section">
            <div className="container">
                <div className="sectionHead">
                    {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
                    <h2 className="h2">{title}</h2>
                </div>
                {children}
            </div>
        </section>
    )
}

function ServiceCard({ title, desc, points }) {
    return (
        <article className="card hoverGuide hoverTip" data-tip="Hover to focus this service">
            <h3 className="h3">{title}</h3>
            <p className="muted">{desc}</p>
            <ul className="list">
                {points.map((p) => (
                    <li key={p}>{p}</li>
                ))}
            </ul>
        </article>
    )
}

function TeamCard({ member }) {
    return (
        <article className="teamCard hoverGuide hoverTip" data-tip="Team member details">
            <Avatar src={member.photoUrl} alt={`${member.name} portrait`} />
            <div className="teamBody">
                <div className="teamName">{member.name}</div>
                <div className="teamRole">{member.role}</div>
                <p className="teamBio">{member.bio}</p>
            </div>
        </article>
    )
}

function MediaGrid() {
    const images = [
        {
            alt: 'Product prototype and design review session',
            src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=70',
        },
        {
            alt: 'Team collaboration and agile workflow board',
            src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=70',
        },
        {
            alt: 'Data dashboard and visualization screen',
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70',
        },
    ]

    return (
        <div className="mediaGrid">
            {images.map((img) => (
                <figure
                    key={img.src}
                    className="mediaFigure hoverGuide hoverTip"
                    data-tip="Hover to preview"
                >
                    <img className="mediaImg" src={img.src} alt={img.alt} loading="lazy" />
                    <figcaption className="mediaCap">{img.alt}</figcaption>
                </figure>
            ))}
        </div>
    )
}

export default function App() {
    return (
        <div id="top" className="page">
            <Header />

            <main id="content">
                <section className="hero">
                    <div className="container heroInner">
                        <div className="heroCopy">
                            <div className="pill">Node.js + React.js · Company Homepage</div>

                            <h1 className="h1">
                                {company.nameEn} <span className="accent">Official Site</span>
                            </h1>

                            <p className="lead">{company.tagline}</p>
                            <p className="muted">{company.summary}</p>

                            <div className="heroCtas">
                                <a
                                    className="btn primary hoverGuide hoverTip"
                                    data-tip="Click to contact us and get an estimate"
                                    href="#contact"
                                >
                                    Get a Proposal
                                </a>

                                <a
                                    className="btn ghost hoverGuide hoverTip"
                                    data-tip="See what we can build for you"
                                    href="#services"
                                >
                                    View Services
                                </a>
                            </div>

                            <StatRow />
                        </div>

                        <div
                            className="heroMedia hoverGuide hoverTip"
                            data-tip="Product showcase"
                            aria-label="Product showcase image"
                        >
                            <img
                                className="heroImg"
                                alt="Product showcase: dashboard and mobile interface"
                                loading="lazy"
                                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=70"
                            />
                            <img className="heroOverlay" alt="" aria-hidden="true" src={bridgeIllustration} />
                            <div className="heroBadge">
                                <div className="badgeTitle">Delivery Principles</div>
                                <div className="badgeText">Usable · Scalable · Maintainable</div>
                            </div>
                        </div>
                    </div>
                </section>

                <Section id="services" eyebrow="Products & Services" title="What We Offer">
                    <div className="grid3">
                        <ServiceCard
                            title="Corporate Website / Brand Site"
                            desc="Build a clear brand presence and conversion path with multi-device support."
                            points={[
                                'Information architecture & content strategy',
                                'Responsive design & performance optimization',
                                'Basic SEO setup',
                            ]}
                        />
                        <ServiceCard
                            title="Web Application Development"
                            desc="Administrative systems and client portals built around real business workflows."
                            points={[
                                'React component-based architecture',
                                'Authentication & routing solutions',
                                'Observability and error handling',
                            ]}
                        />
                        <ServiceCard
                            title="Data Visualization / IoT Dashboard"
                            desc="Transform data into intuitive interfaces for faster and smarter decisions."
                            points={[
                                'KPI definition and dashboard planning',
                                'Multi-device large-screen support',
                                'Alerting and real-time updates',
                            ]}
                        />
                    </div>
                </Section>

                <Section id="about" eyebrow="Background" title="Mission, Vision, and Team">
                    <div className="twoCol">
                        <div className="panel hoverGuide hoverTip" data-tip="Our mission statement">
                            <h3 className="h3">Mission</h3>
                            <p className="muted">
                                We help clients turn ideas into scalable products through reliable engineering and thoughtful design.
                            </p>
                        </div>

                        <div className="panel hoverGuide hoverTip" data-tip="Our vision statement">
                            <h3 className="h3">Vision</h3>
                            <p className="muted">
                                To be a long-term partner enabling small teams to build outstanding digital experiences.
                            </p>
                        </div>
                    </div>

                    <div className="about">
                        <div className="aboutText">
                            <h3 className="h3">How We Work</h3>
                            <p className="muted">
                                We reduce risk early through prototyping, clear iteration plans, and weekly reviews.
                            </p>
                            <ul className="list">
                                <li>Clear requirements and acceptance criteria</li>
                                <li>Design-first development to reduce rework</li>
                                <li>Monitoring, feedback, and continuous improvement</li>
                            </ul>
                        </div>

                        <div className="aboutCard hoverGuide hoverTip" data-tip="Company basic information">
                            <div className="aboutCardTitle">Company Information</div>
                            <dl className="dl">
                                <div className="dlRow">
                                    <dt>Company Name</dt>
                                    <dd>{company.nameEn}</dd>
                                </div>
                                <div className="dlRow">
                                    <dt>Email</dt>
                                    <dd>{company.contact.email}</dd>
                                </div>
                                <div className="dlRow">
                                    <dt>Phone</dt>
                                    <dd>{company.contact.phone}</dd>
                                </div>
                                <div className="dlRow">
                                    <dt>Address</dt>
                                    <dd>{company.contact.address}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </Section>

                <Section id="team" eyebrow="Team Members" title="Key Team Members">
                   

                    <div className="teamGrid">
                        {team.map((m) => (
                            <TeamCard key={m.name} member={m} />
                        ))}
                    </div>
                </Section>

                <Section id="media" eyebrow="Media" title="Images and Video">
                    <div className="mediaLayout">
                        <div className="panel hoverGuide hoverTip" data-tip="Image gallery section">
                            <h3 className="h3">Image Gallery</h3>
                            <p className="muted">Images showcasing our workflow and product forms.</p>
                            <MediaGrid />
                        </div>

                        <div className="videoCard hoverGuide hoverTip" data-tip="Play the demo video">
                            <h3 className="h3">Video Showcase</h3>
                            <p className="muted">Example of embedding public video using HTML5.</p>
                            <video
                                className="video"
                                controls
                                preload="metadata"
                                poster="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=70"
                            >
                                <source
                                    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                            <div className="tiny muted">
                                If external access is blocked in class, place the video file in <code>public/</code> and use a local path
                                such as <code>/demo.mp4</code>.
                            </div>
                        </div>
                    </div>
                </Section>

                <Section id="contact" eyebrow="Contact" title="Let’s Work Together">
                    <div className="contact">
                        <div className="panel hoverGuide hoverTip" data-tip="Contact details">
                            <h3 className="h3">Contact Information</h3>
                            <p className="muted">Schedule a 15-minute consultation to discuss scope and timeline.</p>
                            <ul className="list">
                                <li>
                                    Email: <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
                                </li>
                                <li>Phone: {company.contact.phone}</li>
                                <li>Address: {company.contact.address}</li>
                            </ul>
                        </div>

                        <div className="panel hoverGuide hoverTip" data-tip="This form is front-end demo only">
                            <h3 className="h3">Quick Message (Demo)</h3>
                            <form className="form" onSubmit={(e) => e.preventDefault()}>
                                <label className="field">
                                    <span>Your Name</span>
                                    <input placeholder="e.g. Alex" required />
                                </label>

                                <label className="field">
                                    <span>Message</span>
                                    <textarea placeholder="Briefly describe your request..." rows={4} required />
                                </label>

                                <button
                                    className="btn primary hoverGuide hoverTip"
                                    data-tip="Demo submit button"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </Section>
            </main>

            <footer className="footer">
                <div className="container footerInner">
                    <div className="muted">
                        © {new Date().getFullYear()} {company.nameEn}. All rights reserved.
                    </div>
                    <div className="muted">Built with React + Vite.</div>
                </div>
            </footer>
        </div>
    )
}
