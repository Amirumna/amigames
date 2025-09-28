import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: 'AmiGames | Profile Games',
  description: 'Explore My Journey in Online Games, Showcasing My Skills/Character, Past Projects, and Reviews Games.',
  generator: 'aminetdevelopment.pages.dev',
};

export default function GamesPage() {
  const userProfile = {
    uid: "123456789",
    character: "Amiruman",
    experience: "Master",
    level: 99,
    server: "NA",
    games: ["Wuthering Waves", "Genshin Impact", "Honkai: Star Rail"],
    avatarUrl: "/placeholder-user.jpg",
  };

  return (
  <div className="flex min-h-screen flex-col">
    <SiteHeader />
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.character} />
            <AvatarFallback>{userProfile.character.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{userProfile.character}</CardTitle>
            <p className="text-sm text-muted-foreground">UID: {userProfile.uid}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Experience</h3>
              <p>{userProfile.experience}</p>
            </div>
            <div>
              <h3 className="font-semibold">Level</h3>
              <p>{userProfile.level}</p>
            </div>
            <div>
              <h3 className="font-semibold">Server</h3>
              <p>{userProfile.server}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Games</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {userProfile.games.map((game) => (
                <Badge key={game} variant="secondary">
                  {game}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
        <footer>
          <div className="flex flex-1 flex-col justify-center items-center px-4 text-white mt-18 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 mx-auto">
            <p>© {new Date().getFullYear()} - AmiNET Development. All rights reserved.</p>
          </div>
        </footer>
    </div>
  );
}
