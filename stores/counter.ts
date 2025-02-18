import { defineStore } from 'pinia'

interface CounterState {
  text: string
  language: string
  stats: {
    characters: number
    words: number
    lines: number
  }
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    text: '',
    language: 'en',
    stats: {
      characters: 0,
      words: 0,
      lines: 0
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