export const GEStorage = {
  get: (key: string, defaultValue: string): string => {
    return localStorage.getItem(`GE_${key}`) ?? defaultValue
  },
  set: (key: string, value: string) => {
    localStorage.setItem(`GE_${key}`, value)
  },
  remove: (key: string) => {
    localStorage.removeItem(`GE_${key}`)
  },
}
