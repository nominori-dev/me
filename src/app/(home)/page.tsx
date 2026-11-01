import { FeaturedProjects } from "./sections/featured-projects";
import { HeroSection } from "./sections/hero-section";
import { ParticleMorph } from "./components/particle-morph";

const SKILL_GROUPS = [
    { title: "Backend & architecture", description: "APIs, application design and persistence.", items: ["Java", "Spring Boot", "Quarkus", "Spring Data JPA", "Hibernate", "REST APIs", "OOP", "Domain-driven design"] },
    { title: "Data & messaging", description: "Databases, search and service communication.", items: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "RabbitMQ", "Kafka"] },
    { title: "Web & frontend", description: "Interfaces and full-stack applications.", items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML & CSS", "WordPress"] },
    { title: "Testing & infrastructure", description: "Tools for building, testing and running software.", items: ["JUnit 5", "Mockito", "Git", "Maven", "Docker", "Linux", "Networking", "Python"] },
];

export default function Home() {
    return (
        <main id="main-content" className="portfolio-main">
            <HeroSection />
            <section id="about" className="about-section">
                <div className="section-label"><span>about</span></div>
                <div className="about-content">
                <div className="about-art"><ParticleMorph /></div>
                <div className="about-grid">
                    <h2>Making complex<br />things <em>feel simple.</em></h2>
                </div>
                <div className="about-copy about-copy-below"><p>My expertise lies in Java backend development — Spring Boot, APIs, and system integration — and Next.js for the frontend.</p><p>I enjoy building fast, dependable systems and modern web experiences with care for both the architecture and the details.</p><a href="mailto:nominori999@gmail.com" className="inline-link">GET IN TOUCH <span>↗</span></a></div>
                </div>
                <section className="skills-section" aria-labelledby="skills-title">
                    <div className="skills-intro"><h3 id="skills-title">Skills &amp; tools</h3><p>Technologies and practices I use across my projects.</p></div>
                    <div className="skills-groups">{SKILL_GROUPS.map((group) => <div className="skill-group" key={group.title}><div><h4>{group.title}</h4><p>{group.description}</p></div><ul className="skill-items">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
                </section>
            </section>
            <FeaturedProjects />
        </main>
    );
}
