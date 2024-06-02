// Storing data from api. Plus checking each minute if something changed on api 
const EXPIRED_TIME = 60 * 1000

export const getCachedData = (key: string) => {
  const data = localStorage.getItem(key)
  if (!data) return null
  const { timestamp, articles } = JSON.parse(data)
  const isExpired = Date.now() - timestamp > EXPIRED_TIME
  return isExpired ? null : articles
}

export const setCachedData = (key: string, articles: any) => {
  const data = {
    timestamp: Date.now(),
    articles
  }
  localStorage.setItem(key, JSON.stringify(data))
}