const config = {
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://deltacomponents.dev',
  companyName: 'Delta Components',
  companyDescription:
    'Components that make the difference.',
  socials: {
    twitter: 'https://x.com/pprunty_',
    strava: 'https://www.strava.com/athletes/72636452',
    github: 'https://github.com/pprunty',
    linkedin: 'https://www.linkedin.com/in/patrickprunty/',
    reddit: '',
    tiktok: '',
    instagram: 'https://www.instagram.com/pprunty97/',
    youtube: 'https://www.youtube.com/@patrickprunty?sub_confirmation=1',
    email: '',
  },
};

export default config;
