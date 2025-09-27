import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type UserProfile = {
  uid: string;
  character: string;
  experience: string;
  level: number;
  server: string;
  games: string[];
  avatarUrl: string;
};

export function UserProfileCard({ profile }: { profile: UserProfile }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.avatarUrl} alt={profile.character} />
          <AvatarFallback>{profile.character.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">{profile.character}</CardTitle>
          <p className="text-sm text-muted-foreground">UID: {profile.uid}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Experience</h3>
            <p>{profile.experience}</p>
          </div>
          <div>
            <h3 className="font-semibold">Level</h3>
            <p>{profile.level}</p>
          </div>
          <div>
            <h3 className="font-semibold">Server</h3>
            <p>{profile.server}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Games</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.games.map((game) => (
              <Badge key={game} variant="secondary">
                {game}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}