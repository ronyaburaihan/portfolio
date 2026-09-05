export interface Project {
  name: string;
  period: string;
  description: string;
  technologies: string;
  link: string | null;
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  responsibilities: string[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

const PLAY = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

export const projects: Project[] = [
  {
    name: 'OCR Image to Text Scanner',
    period: '',
    description: 'Document scanning and text extraction from photos, with batch OCR, editable text, translation, and export to PDF, Word, or text files.',
    technologies: 'Android · OCR · Document scanning',
    link: PLAY('com.ocr.image.to.text.scanner')
  },
  {
    name: 'Image Compressor and Resizer',
    period: '',
    description: 'Photo compression with target file-size controls, batch processing, custom resizing, format conversion, and social-media image fitting.',
    technologies: 'Android · Image processing · Batch compression',
    link: PLAY('com.image.compressor.resizer')
  },
  {
    name: 'HashTag & AI Post Writer',
    period: '2025 — 26',
    description: 'AI social-content assistant — hashtags from text or images, captions, rewrites, a bio generator and a post planner, sharing ~93% of its code across platforms.',
    technologies: 'Kotlin Multiplatform · Compose Multiplatform · Room · KVault · AdMob',
    link: PLAY('com.ai.hashtag.generator.caption.writer')
  },
  {
    name: 'Volume Booster',
    period: '2025 — 26',
    description: 'Volume amplification, equalizer, bass boost and sound profiles driven through Android’s audio-effects APIs, with boost scheduling and a speaker cleaner.',
    technologies: 'Kotlin · Jetpack Compose · Dagger Hilt · WorkManager',
    link: PLAY('com.volume.amplifier.sound.booster.max')
  },
  {
    name: 'Genofax',
    period: '2022 — 24',
    description: 'Health assessment and well-being tracking, with real-time data synchronization across native Android and a Flutter iOS build.',
    technologies: 'Kotlin · MVVM · Dagger Hilt · Retrofit · Flutter · GetX',
    link: PLAY('com.genofax.app')
  },
  {
    name: 'DogPro — Dog Profiling',
    period: '2022 — 24',
    description: 'Dog profiling app using on-device ML image classification, backed by a Retrofit API layer.',
    technologies: 'Kotlin · ML image classification · Retrofit',
    link: null
  },
  {
    name: 'Talent Torrent',
    period: '2022 — 24',
    description: 'Talent marketplace built on an MVVM architecture, with Stripe-backed payments.',
    technologies: 'Kotlin · MVVM · Stripe',
    link: null
  },
  {
    name: 'Amar Arabi Ovidhan',
    period: '2022 — 23',
    description: 'Arabic dictionary rebuilt with a modern UI — offline Room storage, search, bookmarks and user accounts.',
    technologies: 'Kotlin · MVVM · Dagger Hilt · Room · Retrofit',
    link: PLAY('com.amararabiovidhan.arabicdictionary')
  },
  {
    name: 'SB-Live — Live Stream Video Chat',
    period: '2022',
    description: 'Live streaming and video chat with virtual gifts, built from scratch on the Agora SDK with Firebase Realtime Database.',
    technologies: 'Kotlin · Agora SDK · Firebase Auth · Realtime Database',
    link: PLAY('com.sbliveapp.sblive')
  },
  {
    name: 'Prime Bazar — E-commerce',
    period: '2022',
    description: 'Flutter e-commerce app — performance optimization, new features and bug fixing across the codebase.',
    technologies: 'Flutter · Dart',
    link: PLAY('com.primebazar.app')
  },
  {
    name: 'Speak English Online',
    period: '2021',
    description: 'Anonymous global voice calls for speaking practice — no login, unlimited free calls.',
    technologies: 'Kotlin · Firebase · Agora SDK',
    link: PLAY('com.techdoctorbd.anonymouscall')
  },
  {
    name: 'Starnote Social',
    period: '2021',
    description: 'Social learning platform with feeds, groups, calls, live streaming and teacher matching.',
    technologies: 'Java · Kotlin · Sinch SDK',
    link: PLAY('com.stardigiinternational.starnotee')
  },
  {
    name: 'Hash Generator',
    period: '2020',
    description: 'SHA-1/224/256/384/512 and MD5 for any text — one tap to the clipboard.',
    technologies: 'Kotlin · XML',
    link: PLAY('com.techdoctorbd.hashgenerator')
  },
  {
    name: 'Age Calculator',
    period: '2020',
    description: 'Exact age down to the second, plus the next ten birthdays on a clean screen.',
    technologies: 'Java · XML',
    link: PLAY('com.techdoctorbd.agecalculator')
  },
  {
    name: 'Alo Blood Donor',
    period: '2019',
    description: 'Firebase-powered donor finder connecting patients with nearby blood donors, fast.',
    technologies: 'Java · Firebase',
    link: PLAY('bd.com.aloblooddonor')
  },
  {
    name: 'Ramadan Calendar',
    period: '2019',
    description: 'Sahri and iftar schedules for every district of Bangladesh, with countdowns and alarms.',
    technologies: 'Kotlin · XML',
    link: PLAY('englesoft.com.dailyramadan')
  }
];

export const experience: Experience[] = [
  {
    period: 'Jun 2025 — Present',
    title: 'Senior Software Engineer (Android & iOS)',
    company: 'Envobyte Ltd. — Khulna, Bangladesh',
    responsibilities: [
      'Lead mobile engineering across feature planning, architecture, and agile delivery, establishing code-quality standards for Android and iOS applications.',
      'Develop and deliver native <strong>Android</strong> applications with Kotlin and shared Android/iOS solutions with <strong>Kotlin Multiplatform</strong>.',
      'Design modular, testable systems using <strong>Clean Architecture</strong>, Hilt, Koin, Coroutines, Flow, and Ktor to support maintainability and product growth.',
      'Review code, resolve technical issues, and optimize application performance in collaboration with designers, backend engineers, and product managers.'
    ]
  },
  {
    period: 'Aug 2022 — Dec 2024',
    title: 'Software Engineer — Android',
    company: 'Genofax® Life Sciences — Dhaka, Bangladesh',
    responsibilities: [
      'Developed and maintained native Android applications with Java and Kotlin, alongside cross-platform applications with <strong>Flutter</strong>.',
      'Implemented complex user interfaces and <strong>real-time data synchronization</strong> for a health and wellness platform.',
      'Applied <strong>Clean Architecture</strong>, Dagger Hilt, and Kotlin Coroutines to structure dependencies and asynchronous workflows for maintainable application code.',
      'Led mobile development delivery and coordinated with designers and product managers to align implementation with product requirements and release schedules.'
    ]
  },
  {
    period: 'Feb 2022 — May 2022',
    title: 'Android Developer',
    company: 'Prime IT — Narayanganj, Bangladesh',
    responsibilities: [
      'Translated business requirements and technical specifications into native Android and cross-platform <strong>Flutter</strong> applications.',
      'Integrated third-party <strong>REST APIs</strong> and implemented adaptive layouts to support consistent functionality across device sizes.',
      'Structured application features using <strong>MVVM</strong>, Dagger Hilt, and Kotlin Coroutines to separate presentation, business logic, and asynchronous operations.',
      'Introduced development tools and technologies to improve engineering workflows and application maintainability.'
    ]
  },
  {
    period: 'Dec 2019 — Jan 2022',
    title: 'Android Developer (Part-Time)',
    company: 'SoftLab IT — Dhaka, Bangladesh',
    responsibilities: [
      'Developed native Android applications in Java and Kotlin, translating initial specifications into functional mobile features.',
      'Implemented adaptive user interfaces to provide consistent usability across Android screen sizes and resolutions.',
      'Integrated third-party libraries, APIs, <strong>SQLite</strong> storage, and background processing to support application functionality and offline data access.',
      'Collaborated with designers and product managers to translate product requirements into intuitive interfaces and reliable application behavior.'
    ]
  }
];

export const skills: SkillCategory[] = [
  {
    title: 'Languages & frameworks',
    items: ['Kotlin', 'Java', 'Swift', 'Dart', 'Android SDK', 'Jetpack Compose', 'Kotlin Multiplatform', 'Compose Multiplatform', 'Flutter', 'SwiftUI & UIKit']
  },
  {
    title: 'Architecture & patterns',
    items: ['Clean Architecture', 'MVVM · MVP · MVC', 'Modular / multi-module', 'Jetpack components', 'Dependency injection', 'Unidirectional data flow']
  },
  {
    title: 'Tools & platform',
    items: ['Dagger Hilt · Koin', 'Coroutines · Flow', 'Ktor · Retrofit · OkHttp', 'Room · SQLDelight · DataStore', 'WorkManager · Paging 3', 'Firebase (App Check, FCM, Crashlytics, Analytics)', 'Play Billing · StoreKit 2 · RevenueCat', 'Google ML Kit · CameraX', 'Baseline profiles · R8', 'Git · Gradle · CI']
  }
];
