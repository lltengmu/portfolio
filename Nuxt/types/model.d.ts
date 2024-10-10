interface User {
  id: number
  uuid: string
  name: string
  email: string
  phone: string
  avatar: string
  resume: string
  github: string
  address: string
  birth: string
  updatedAt: Date
  createdAt: Date
}

interface State {
  id: number
  Years_of_experience: number
  Projects_completed: number
  Technologies_mastered: number
  Code_commits: number
  updatedAt: string
  createdAt: string
}

interface Socials {
  id: number
  github: string | null
  document: string | null
  bilibili: string | null
  tiktok: string | null
  updatedAt: Date
  createdAt: Date
}

interface Education {
  id: number
  start: string
  end: string
  institution: string
  degree: string
  updatedAt: Date
  createdAt: Date
}

interface Experience {
  id: number
  start: string
  end: string
  company: string
  position: string
  updatedAt: Date
  createdAt: Date
}

interface Supply {
  id: number
  title: string
  description: string
  updatedAt: Date
  createdAt: Date
}

interface Project {
  id: number
  nanoid: string
  title: string
  description: string
  stack: string[]
  github: string | null
  live: string | null
  image: string
  updatedAt: string
  createdAt: string
}

interface Resume {
  id: number
  name: string
  path: string
  updatedAt: string
  createdAt: string
}
