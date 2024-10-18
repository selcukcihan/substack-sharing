export const checkUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (error) {
    console.error('Invalid URL', error)
    return false
  }
}
