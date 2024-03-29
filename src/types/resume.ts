import type { DateYYMM } from "./string";

export type Period = {
  from: DateYYMM;
  to?: DateYYMM;
};

export type ResumeLink = {
  name: string;
  url: string;
};

export type ProjectTeam = string;

export type Project = {
  title: string;
  period: Period;
  team?: ProjectTeam;
  shortDescription: string;
  links: ResumeLink[];
  description: string;
  stacks: string[];
};

export type Career = {
  company: string;
  period: Period;
  position: string;
  shortDescription?: string;
  descriptions: string[];
  links: ResumeLink[];
};

export type ResumeSectionData = {
  title: string;
  period: Period;
  points?: string[];
  descriptions?: string[];
  links?: ResumeLink[];
};
