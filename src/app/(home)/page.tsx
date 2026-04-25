import { Badge } from "@/components/ui/badge";
import { FeaturedProjects } from "./sections/featured-projects";
import { HeroSection } from "./sections/hero-section";

const TECH_STACK = [
    "Java",
    "Spring Boot",
    "Quarkus",
    "Next.js",
    "React",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Elastic Search",
    "Docker",
    "Kafka",
    "RabbitMQ",
    "Wordpress",
    "Python",
    "TypeScript",
];

export default function Home() {
  return (
      <main>
          <div className="max-w-[90%] mx-auto">
              <HeroSection />
          </div>

          <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-[90%] mx-auto mt-16">
              <div>
                  <h2 className="text-2xl mb-4">About me</h2>
                  <p className="opacity-80">My expertise lies in <span className="font-semibold">Java backend development</span> (Spring Boot, APIs, system integration) and <span className="font-semibold">Next.js</span> for frontend, where I build fast, SEO-friendly, and modern web experiences.</p>
              </div>

              <div className="space-y-4">
                  <div className="bevel rounded-lg border border-border/60 p-4">
                      <div className="flex items-center justify-between">
                          <div>
                              <div className="text-sm font-mono uppercase tracking-wider opacity-70">E-mail</div>
                              <div className="font-light text-sm">nominori999@gmail.com</div>
                          </div>
                      </div>
                  </div>

                  <div className="bevel rounded-lg border border-border/60 p-4">
                      <div className="text-sm font-mono uppercase tracking-wider opacity-70">Tech Stack</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                          {TECH_STACK.map((tech) => (
                              <Badge key={tech} variant="chrome">
                                  {tech}
                              </Badge>
                          ))}
                      </div>
                  </div>
              </div>
          </section>

          <FeaturedProjects />
      </main>
  );
}
