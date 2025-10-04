import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { AppverseFooter } from '@/components/appverse-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import { Gamepad2, Code2, Users, Star, Trophy, Heart, Zap, Globe, Github, Mail, ExternalLink, Award, Target, Lightbulb } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: siteConfig.pageTitles.about,
  description: siteConfig.pageDescriptions.about,
  generator: siteConfig.generator,
}

const gamingStats = [
  { label: "Games Played", value: "50+", icon: Gamepad2 },
  { label: "Years Gaming", value: "10+", icon: Trophy },
  { label: "Favorite Genre", value: "RPG", icon: Star },
  { label: "Current Level", value: "99+", icon: Award },
]

const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Runtime" },
  { name: "Cloudflare", category: "Hosting" },
]

const gamingAchievements = [
  {
    game: "Genshin Impact",
    achievement: "AR 60",
    description: "Reached maximum Adventure Rank",
    icon: "⭐"
  },
  {
    game: "Wuthering Waves",
    achievement: "Union Level 90",
    description: "Mastered the game mechanics",
    icon: "🌊"
  },
  {
    game: "Honkai: Star Rail",
    achievement: "Trailblaze Level 70",
    description: "Completed all story content",
    icon: "🚀"
  },
  {
    game: "Valorant",
    achievement: "Diamond Rank",
    description: "Competitive FPS excellence",
    icon: "🎯"
  }
]

const projects = [
  {
    name: "AmiVerse",
    description: "Personal gaming hub and portfolio",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Active",
    link: "/"
  },
  {
    name: "Kertas",
    description: "Google Drive directory index",
    tech: ["Next.js", "Google APIs", "Cloudflare"],
    status: "Active",
    link: "/kertas"
  },
  {
    name: "AmiNET Development",
    description: "Development studio and services",
    tech: ["Web Development", "Gaming Solutions"],
    status: "Active",
    link: "#"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Avatar className="h-32 w-32 border-4 border-lime-300/20">
                <AvatarImage src="/placeholder-user.jpg" alt="Amiruman" />
                <AvatarFallback className="text-2xl font-bold bg-lime-300/10 text-lime-300">
                  AM
                </AvatarFallback>
              </Avatar>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              About <span className="text-lime-300">AmiVerse</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-300">
                & My Gaming Journey
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Discover the story behind my passion for gaming, development, and creating 
              digital experiences that bring gaming stories to life.
            </p>
          </div>
        </section>

        {/* Gaming Stats */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {gamingStats.map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-lime-300 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Personal Introduction */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center mb-4">
                  Who I Am
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Hello! I'm <span className="text-lime-300 font-semibold">Amiruman</span>, the creator behind AmiVerse. 
                  I'm a passionate gamer and developer who believes in bringing gaming stories to life through 
                  innovative web experiences.
                </p>
                
                <p className="text-lg text-neutral-300 leading-relaxed">
                  My mission is to create a hub where gaming enthusiasts can showcase their achievements, 
                  connect with fellow players, and explore the intersection of gaming and technology. 
                  AmiVerse represents my journey in both the gaming world and web development.
                </p>
                
                <div className="flex items-center gap-2 text-lime-300">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Passionate about gaming, development, and community building</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Gaming Philosophy */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              My <span className="text-lime-300">Gaming Philosophy</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Gamepad2 className="h-6 w-6 text-lime-300" />
                    Gaming Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">
                    My gaming journey started over a decade ago, and it has shaped who I am today. 
                    From RPGs to competitive FPS games, each experience has taught me valuable lessons 
                    about strategy, teamwork, and perseverance.
                  </p>
                  <p className="text-neutral-300">
                    I believe gaming is more than entertainment—it's a way to connect with people, 
                    develop skills, and explore new worlds and possibilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-lime-300" />
                    Current Focus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">
                    Currently, I'm deeply immersed in <span className="text-lime-300 font-semibold">Wuthering Waves</span>, 
                    <span className="text-lime-300 font-semibold"> Genshin Impact</span>, and 
                    <span className="text-lime-300 font-semibold"> Honkai: Star Rail</span>.
                  </p>
                  <p className="text-neutral-300">
                    These games represent the perfect blend of storytelling, character development, 
                    and strategic gameplay that I love most about gaming.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gaming Achievements */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Gaming <span className="text-lime-300">Achievements</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {gamingAchievements.map((achievement, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold text-white mb-2">{achievement.game}</h3>
                  <div className="text-lime-300 font-semibold mb-2">{achievement.achievement}</div>
                  <p className="text-sm text-neutral-400">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Technical <span className="text-lime-300">Expertise</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Code2 className="h-6 w-6 text-lime-300" />
                    Development Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="justify-center py-2">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-neutral-300 mt-4">
                    I specialize in modern web development with a focus on performance, 
                    user experience, and scalable solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-lime-300" />
                    Gaming Tech
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">
                    I optimize hardware and software for the best gaming experience, 
                    ensuring smooth gameplay and zero lag across all platforms.
                  </p>
                  <div className="flex items-center gap-2 text-lime-300">
                    <Globe className="h-5 w-5" />
                    <span>Cross-platform gaming enthusiast</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            My <span className="text-lime-300">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.name}
                    <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                      {project.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-lime-300/50 text-lime-300 hover:bg-lime-300/10"
                    asChild
                  >
                    <Link href={project.link}>
                      View Project
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AmiVerse Vision */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center mb-4">
                  AmiVerse <span className="text-lime-300">Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  AmiVerse is more than just a personal portfolio—it's a hub where gaming meets development. 
                  I envision it as a space where gamers can showcase their achievements, developers can 
                  share their projects, and communities can connect.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-lime-300 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Community Building</h3>
                      <p className="text-neutral-300 text-sm">
                        Creating connections between gamers and developers worldwide.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-lime-300 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Innovation</h3>
                      <p className="text-neutral-300 text-sm">
                        Pushing the boundaries of gaming and web development.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact & Connect */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Let's <span className="text-lime-300">Connect</span>
            </h2>
            
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to connect with fellow gamers, developers, and creators. 
              Whether you want to discuss gaming strategies, collaborate on projects, 
              or just chat about the latest releases, I'd love to hear from you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-lime-400 text-black font-medium hover:bg-lime-300 hover:shadow-md hover:scale-105 transition-all"
                asChild
              >
                <Link href="/#contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Get In Touch
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-lime-300/50 text-lime-300 hover:bg-lime-300/10"
                asChild
              >
                <Link href="/games">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  View Gaming Profiles
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AppverseFooter />
    </div>
  )
}
