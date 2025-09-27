"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type UserProfile = {
  uid: string;
  character: string;
  experience: string;
  level: number;
  server: string;
  games: string[];
  avatarUrl: string;
};

const userProfiles: UserProfile[] = [
  {
    uid: "123456789",
    character: "Amiruman",
    experience: "Master",
    level: 99,
    server: "NA",
    games: ["Wuthering Waves", "Genshin Impact", "Honkai: Star Rail"],
    avatarUrl: "/placeholder-user.jpg",
  },
  {
    uid: "987654321",
    character: "Gemini",
    experience: "Grandmaster",
    level: 100,
    server: "EU",
    games: ["Valorant", "League of Legends", "Overwatch 2"],
    avatarUrl: "/placeholder.svg",
  },
  {
    uid: "112233445",
    character: "Clippy",
    experience: "Beginner",
    level: 10,
    server: "ASIA",
    games: ["Minecraft", "Roblox"],
    avatarUrl: "/placeholder.jpg",
  },
];

function UserProfileCard({ profile }: { profile: UserProfile }) {
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

export default function GameProfilePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = userProfiles.filter((profile) =>
    profile.character.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search by character name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProfiles.map((profile) => (
          <UserProfileCard key={profile.uid} profile={profile} />
        ))}
      </div>
       {filteredProfiles.length === 0 && (
        <div className="text-center col-span-full">
          <p>No profiles found.</p>
        </div>
      )}
    </div>
  );
}
