"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar } from "lucide-react"

type Education = {
  institution: string
  degree: string
  field: string
  period: string
  gpa?: string
  achievements: string[]
  coursework: string[]
}

export default function Education() {
  const education: Education[] = [
    {
      institution: "University of Technology",
      degree: "Master of Science",
      field: "Computer Science",
      period: "2020 - 2022",
      gpa: "3.8/4.0",
      achievements: [
        "Dean's List for 3 consecutive semesters",
        "Outstanding Graduate Student Award",
        "Published research paper on distributed systems",
      ],
      coursework: [
        "Advanced Algorithms",
        "Distributed Systems",
        "Machine Learning",
        "Software Architecture",
        "Database Systems",
      ],
    },
    {
      institution: "State University",
      degree: "Bachelor of Science",
      field: "Software Engineering",
      period: "2016 - 2020",
      gpa: "3.7/4.0",
      achievements: [
        "Magna Cum Laude",
        "President of Computer Science Club",
        "Winner of Annual Hackathon 2019",
        "Teaching Assistant for Data Structures course",
      ],
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Web Development",
        "Software Engineering Principles",
        "Computer Networks",
      ],
    },
  ]

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SA-2023-001",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
      credentialId: "GCP-PD-2022-045",
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2022",
      credentialId: "MDB-DEV-2022-123",
    },
  ]

  return (
    <section id="education" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic background and professional certifications
          </p>
        </motion.div>

        {/* Education */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 flex items-center gap-2"
          >
            <GraduationCap className="h-6 w-6 text-primary" />
            Education
          </motion.h3>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                        <div className="text-lg font-medium text-primary">{edu.field}</div>
                        <div className="text-muted-foreground">{edu.institution}</div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {edu.period}
                        </Badge>
                        {edu.gpa && <Badge variant="secondary">GPA: {edu.gpa}</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                          <Award className="h-4 w-4 text-primary" />
                          Achievements
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Relevant Coursework</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <Badge key={course} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 flex items-center gap-2"
          >
            <Award className="h-6 w-6 text-primary" />
            Professional Certifications
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.credentialId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                      <Badge variant="outline" className="mb-2">
                        {cert.date}
                      </Badge>
                      <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
