export default function Home() {
  return (
      <main>
          <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-[90%] mx-auto">
              <div>
                  <h2 className="text-2xl mb-4">About me</h2>
                  <p className="opacity-80">My expertise lies in <span className="font-semibold">Java backend development</span> (Spring Boot, APIs, system integration) and <span className="font-semibold">Next.js</span> for frontend, where I build fast, SEO-friendly, and modern web experiences.</p>
              </div>

              <div className="space-y-4">
                  <div className="rounded-lg border border-black/6 p-4">
                      <div className="flex items-center justify-between">
                          <div>
                              <div className="text-sm">E-mail</div>
                              <div className="font-light text-sm">nominori999@gmail.com</div>
                          </div>
                      </div>
                  </div>

                  <div className="rounded-lg border border-black/6 p-4">
                      <div className="text-sm">Tech Stack</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Java</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Spring Boot</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Quarkus</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Next.js</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">React</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">MySQL</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">PostgreSQL</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">MongoDB</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Elastic Search</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Docker</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Kafka</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">RabbitMQ</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Wordpress</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">Python</span>
                          <span className="px-2 py-1 rounded bg-black/3 text-xs">TypeScript</span>
                      </div>
                  </div>
              </div>
          </section>
      </main>
  );
}
