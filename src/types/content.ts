export type Lang = 'en' | 'zh'

export interface NavLink { label: string; page: string }
export interface CtaLink { label: string; page: string }
export interface StatItem { num: string; label: string }
export interface StepItem { title: string; text: string }
export interface TrustItem { title: string; text?: string }
export interface HiwStep { num: string; title: string; body: string }

export interface ScheduleItem { t: string; a: string }
export interface IncludeItem { item: string; inc: boolean }
export interface School {
  id: string; name: string; city: string; area: string
  ageRange: string; languages: string; durations: string; priceFrom: string
  features: string[]; photo: string; badge: string; desc: string
  schedule: ScheduleItem[]; includes: IncludeItem[]
}

export interface WhyCard {
  icon: string; stat: string; title: string; body: string; bullets: string[]
}
export interface VettingItem { num: string; title: string; text: string }
export interface WhyItem   { icon: string; title: string; text: string }
export interface TeamMember { name: string; role: string; initials: string; quote: string; bio: string; photo?: string }
export interface FaqItem    { q: string; a: string }
export interface BlogPost   { tag: string; title: string; excerpt: string; date: string; img: string }
export interface BenefitItem { icon: string; title: string; text: string }

export interface SiteContent {
  site: {
    name: string; tagline: string; email: string; domain: string
    logo: string; defaultLang?: string; heroBgOpacity?: number; theme?: 't1' | 't2' | 't3'
    customPink?: string
    customGreen?: string
    t2PinkIntensity?: number
    t3PinkInject?: number
    blogHidden?: boolean
    faqHidden?: boolean
    featuredProgramsHidden?: boolean
    t3Elements?: {
      navCta?: boolean; navLogo?: boolean; navLogoIcon?: boolean; navActiveLink?: boolean
      navPrograms?: boolean; navWhyTaiwan?: boolean; navHowItWorks?: boolean; navAbout?: boolean
      navBlog?: boolean; navFaq?: boolean; navContact?: boolean
      heroBadge?: boolean; heroCta1?: boolean; heroCta2?: boolean; trustItems?: boolean
      btnPrimary?: boolean; btnOutline?: boolean
      sectionLabel?: boolean
      statNumbers?: boolean; stepNumbers?: boolean; hiwNumbers?: boolean; vettingNumbers?: boolean; whyStats?: boolean
      tags?: boolean; cardBadge?: boolean; blogTag?: boolean
      faqIcon?: boolean; teamRole?: boolean
      ctaBand?: boolean
    }
  }
  nav: { links: NavLink[]; cta: CtaLink }
  home: {
    heroImg: string; heroImgOpacity: number; heroImgMobile: boolean; heroImgMobileOpacity: number; heroImgFade: number
    badge: string; headline: string; sub: string; cta1: string; cta2: string
    trust: string[]; trustPerRow?: number; stats: StatItem[]
    featuredTitle: string; featuredSub: string
    howTitle: string; howSub: string; steps: StepItem[]
    ctaTitle: string; ctaSub: string; ctaBtn: string; ctaBtn2: string
  }
  programs: { title: string; sub: string; schools: School[] }
  whyTaiwan: {
    title: string; sub: string; cards: WhyCard[]
    ctaTitle: string; ctaSub: string; ctaBtn: string
  }
  howItWorks: {
    title: string; sub: string; steps: HiwStep[]
    ctaTitle: string; ctaSub: string; ctaBtn: string
  }
  about: {
    title: string; sub: string; missionBg: string; mission: string; story: string
    vettingTitle: string; vettingSub: string; vetting: VettingItem[]
    whyTitle: string; why: WhyItem[]
    teamTitle: string; teamVersion: number; team: TeamMember[]
  }
  faq:     { title: string; sub: string; items: FaqItem[] }
  contact: { title: string; sub: string; email: string; whatsapp: string; line: string; response: string; formTitle: string }
  partner: {
    title: string; sub: string
    benefits: BenefitItem[]; benefitsTitle?: string
    processTitle: string; processSteps: string[]
    ctaTitle: string; ctaSub: string; ctaEmail: string; ctaBtn: string
  }
  blog:   { title: string; sub: string; posts: BlogPost[] }
  footer: { desc: string; copyright: string; legal: string }
}
