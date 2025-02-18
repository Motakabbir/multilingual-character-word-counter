export const useCounter = () => {
    const detectLanguage = (text: string) => {
      if (/\p{Script=Han}/u.test(text)) return 'chinese'
      if (/\p{Script=Devanagari}/u.test(text)) return 'hindi'
      if (/\p{Script=Bengali}/u.test(text)) return 'bengali'
      return 'english'
    }
  
    const countWords = (text: string, language: string) => {
      if (language === 'chinese') return [...text.replace(/\s/g, '')].length
      return text.trim().split(/\s+/).filter(w => w).length
    }
  
    const countCharacters = (text: string) => [...text].length
  
    return { detectLanguage, countWords, countCharacters }
  }