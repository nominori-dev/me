import { FeaturedProjects } from "./sections/featured-projects";
import { HeroSection } from "./sections/hero-section";
import { ParticleMorph } from "./components/particle-morph";

const TECH_STACK = ["Java", "Spring Boot", "Quarkus", "Next.js", "React", "MySQL", "PostgreSQL", "MongoDB", "Elastic Search", "Docker", "Kafka", "RabbitMQ", "Wordpress", "Python", "TypeScript"];

export default function Home() {
    return (
        <main id="main-content" className="portfolio-main">
            <HeroSection />
            <section id="about" className="about-section">
                <div className="section-label"><span>ABOUT</span></div>
                <div className="about-grid">
                    <h2>Making complex<br />things <em>feel simple.</em></h2>
                    <ParticleMorph />
                </div>
                <div className="about-copy about-copy-below"><p>My expertise lies in Java backend development — Spring Boot, APIs, and system integration — and Next.js for the frontend.</p><p>I enjoy building fast, dependable systems and modern web experiences with care for both the architecture and the details.</p><a href="mailto:nominori999@gmail.com" className="inline-link">GET IN TOUCH <span>↗</span></a></div>
                <div className="stack-row"><span className="stack-label">TOOLS OF THE TRADE<br /><small>THE TECH STACK / 01—15</small></span><div className="stack-list">{TECH_STACK.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
            </section>
            <FeaturedProjects />
        </main>
    );
}
