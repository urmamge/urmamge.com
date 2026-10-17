export interface About {
  paragraphs: string[];
  facts: { label: string; value: string }[];
  skillsLabel: string;
  skills: string[];
  /** Link to the CV PDF. Leave undefined to show a "coming soon" placeholder. */
  cvHref?: string;
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
  skills: ['JavaScript', 'Java', 'C#'],
  // TODO: set to '/cv.pdf' (and add public/cv.pdf) once the CV is ready
};
