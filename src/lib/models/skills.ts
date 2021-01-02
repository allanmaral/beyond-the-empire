import enUsSkills from '../data/en-us/skills.json'
import Utils from './utils'
import { Skill } from '../types/skill'

const skills: { [key: string]: Skill[] } = {
  en: enUsSkills as Skill[]
}

interface SkillDictionary {
  [key: string]: Skill
}

const dictionaries = Object.keys(skills).reduce<{
  [key: string]: SkillDictionary
}>(
  (result, locale) => ({
    ...result,
    [locale]: Utils.getDictionary(locale, skills)
  }),
  {}
)

const getByKey = (key: string, locale: string): Skill | null => {
  const skillList = dictionaries[locale]
  return skillList[key] || null
}

const getByName = (name: string, locale: string): Skill | null => {
  const skillList = skills[locale] || []
  return skillList.find(s => s.name === name) || null
}

const getKeyDictionary = (locale: string): { [key: string]: Skill } => {
  return dictionaries[locale]
}

export default {
  getByKey,
  getByName,
  getKeyDictionary
}
