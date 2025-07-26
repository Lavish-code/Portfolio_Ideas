import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Header from "@/components/header"
import Education from "@/components/education"

export const metadata: Metadata = {
  title: "Full-Stack Developer Portfolio",
  description: "A professional portfolio showcasing full-stack development skills and projects",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </main>
  )
}
