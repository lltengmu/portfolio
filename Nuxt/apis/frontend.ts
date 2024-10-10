import { Http } from '~/plugins/axios'

export const findUser = (uuid: string) => {
  return Http.request<User>({
    url: `/frontend/user/${uuid}`,
  }).then((r) => r.data)
}

export const findUserResume = (uuid: string) => {
  return Http.request<Resume>({
    url: `/frontend/user-resume/${uuid}`,
  }).then((r) => r.data)
}

export const findUserState = (uuid: string) => {
  return Http.request<State>({
    url: `/frontend/user-state/${uuid}`,
  }).then((r) => r.data)
}

export const findUserSocial = (uuid: string) => {
  return Http.request<Socials>({
    url: `/frontend/user-social/${uuid}`,
  }).then((r) => r.data)
}

export const findUserService = (uuid: string) => {
  return Http.request<Supply[]>({
    url: `/frontend/user-service/${uuid}`,
  }).then((r) => r.data)
}

export const findUserExperience = (uuid: string) => {
  return Http.request<Experience[]>({
    url: `/frontend/user-experience/${uuid}`,
  }).then((r) => r.data)
}

export const findUserEducation = (uuid: string) => {
  return Http.request<Education[]>({
    url: `/frontend/user-education/${uuid}`,
  }).then((r) => r.data)
}

export const findUserProject = (uuid: string) => {
  return Http.request<Project[]>({
    url: `/frontend/user-project/${uuid}`,
  }).then((r) => r.data)
}
