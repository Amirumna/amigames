export const siteConfig = {
  appName: 'AmiVerse',
  description: 'AmiVerse is a Hub of Projects by AmiNET Development.',
  generator: 'aminetdevelopment.pages.dev',
  pageTitles: {
    home: `AmiVerse | HOME`,
    games: `AmiVerse | GAMES`,
    kertas: `AmiVerse | KERTAS`,
    about: `AmiVerse | ABOUT`,
    maintenance: `AmiVerse | 503 Service Unavailable`,
    notFound: `AmiVerse | 404 Not Found`,
    test: `AmiVerse | TEST`,
  },
  pageDescriptions: {
    home: 'AmiVerse is a Hub of Projects by AmiNET Development.',
    games: 'Explore gaming profiles and connect with other players in the AmiVerse gaming community.',
    kertas: 'Kertas is a public Google Drive directory index. Browse, preview, and download files securely.',
    about: 'Discover the story behind AmiVerse - my gaming journey, development expertise, and passion for creating digital experiences.',
    maintenance: 'The server is currently unable to handle the request due to maintenance downtime or capacity problems. Please try again later.',
    notFound: 'The page you are looking for could not be found.',
    test: 'Test page for development and debugging purposes.',
  },
  faviconPath: '/icons/amigames.svg',
  copyright: 'AmiNET Development',
  copyright_tagline: 'Explore My Journey in Online Games, Showcasing My Skills/Character, Past Projects, and Reviews Games.',
} as const;

export function createPageTitle(pageName: string): string {
  return `${siteConfig.appName} | ${pageName.toUpperCase()}`;
}