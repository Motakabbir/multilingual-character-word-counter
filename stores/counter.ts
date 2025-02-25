import { defineStore } from 'pinia'

interface CounterState {
  text: string
  language: string
  stats: {
    characters: number
    words: number
    lines: number
    paragraphs: number
    alphabets: { [key: string]: number }
    numbers: { [key: string]: number }
    specialChars: { [key: string]: number }
  }
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    text: '',
    language: 'en',
    stats: {
      characters: 0,
      words: 0,
      lines: 0,
      paragraphs: 0,
      alphabets: {},
      numbers: {},
      specialChars: {}
    }
  }),
  
  actions: {
    updateText(newText: string) {
      this.text = newText
      this.calculateStats()
    },
    
    calculateStats() {
      this.stats.characters = this.text.length
      this.stats.lines = this.text.split('\n').length
      this.stats.paragraphs = this.text.split(/\n\s*\n/).filter(Boolean).length
      
      // Reset all character counts
      this.stats.alphabets = {}
      this.stats.numbers = {}
      this.stats.specialChars = {}
      
      // Count all character types
      const chars = [...this.text]
      chars.forEach(char => {
        if (/[A-Za-z]/.test(char)) {
          // Letters
          const lowerChar = char.toLowerCase()
          this.stats.alphabets[lowerChar] = (this.stats.alphabets[lowerChar] || 0) + 1
        } else if (/[0-9]/.test(char)) {
          // Numbers
          this.stats.numbers[char] = (this.stats.numbers[char] || 0) + 1
        } else if (!/\s/.test(char)) {
          // Special characters (excluding whitespace)
          this.stats.specialChars[char] = (this.stats.specialChars[char] || 0) + 1
        }
      })
      
      // Handle word counting based on language
      switch(this.language) {
        case 'zh':
          // Chinese words are typically separated by spaces or punctuation
          this.stats.words = this.text.trim().split(/[，。！？\s]+/).filter(Boolean).length
          break
        case 'bn':
        case 'hi':
          // For Bengali and Hindi, split on spaces and various punctuation marks
          this.stats.words = this.text.trim()
            .split(/[\s।,!?]+/)
            .filter(Boolean).length
          break
        default:
          // English and other languages
          this.stats.words = this.text.trim().split(/\s+/).filter(Boolean).length
      }
    },
    
    setLanguage(lang: string) {
      this.language = lang
      this.calculateStats()
    }
  }
})