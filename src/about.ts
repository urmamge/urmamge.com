export interface About {
  paragraphs: string[];
  facts: { label: string; value: string }[];
  skillsLabel: string;
  skills: string[];
  /** Link to the CV PDF. Leave undefined to show an "Email me for CV" button instead. */
  cvHref?: string;
  /** Show Discord and email contact buttons instead of the CV button. */
  contact?: {
    /** Username shown on the button. */
    discord: string;
    /** User ID for the discord.com/users/ profile link (Developer Mode → Copy User ID). */
    discordId: string;
  };
}

/** About section on matthewhearst.com/portfolio */
export const portfolioAbout: About = {
  paragraphs: [
    "I'm a final-year Software Engineering student at Queen's University Belfast. I like building small, practical tools that fix problems I actually run into, like a calorie tracker, a document-to-audio converter and an OBS plugin for my streams.",
    "I'm looking for a graduate software engineering role and I'm open to freelance work. If you think I could help, get in touch.",
  ],
  facts: [
    { label: 'Degree', value: "BEng Software Engineering, Queen's University Belfast" },
    { label: 'Graduating', value: '2027' },
    { label: 'Open to', value: 'Graduate roles, freelance work' },
  ],
  skillsLabel: "Languages I've worked with",
  skills: ['JavaScript', 'TypeScript', 'Java', 'C#'],
  // TODO: set to '/cv.pdf' (and add public/cv.pdf) once the CV is ready
};

/** About section on matthewhearst.com/urmamge */
export const urmamgeAbout: About = {
  paragraphs: [
    "I'm a freelance video editor with experience editing both long-form videos and short-form content. I edit in DaVinci Resolve.",
    "I'm looking for new editing opportunities. If you need an editor for your videos, message me on Discord or send me an email.",
  ],
  facts: [
    { label: 'Role', value: 'Freelance video editor' },
    { label: 'Experience', value: 'Long-form and short-form' },
    { label: 'Open to', value: 'Editing opportunities' },
  ],
  skillsLabel: 'Software',
  skills: ['DaVinci Resolve'],
  contact: { discord: 'urmamge', discordId: '401779843353673749' },
};
