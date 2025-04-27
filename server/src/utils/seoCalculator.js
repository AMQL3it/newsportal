function calculateSeoScore({ title, content }) {
    let score = 0;
  
    if (title && title.length >= 50 && title.length <= 60) {
      score += 25;
    }
    if (content && content.length >= 120 && content.length <= 160) {
      score += 25;
    }
  
    return score; // Max 100
}
  
function calculateReadableScore(content) {
    if (!content) return 0;
  
    const sentenceCount = (content.match(/[.!?]/g) || []).length || 1;
    const wordCount = content.split(/\s+/).length || 1;
  
    const avgWordsPerSentence = wordCount / sentenceCount;
  
    if (avgWordsPerSentence <= 12) {
      return 90; // Very easy to read
    } else if (avgWordsPerSentence <= 17) {
      return 70; // Standard
    } else if (avgWordsPerSentence <= 25) {
      return 50; // Difficult
    } else {
      return 30; // Very difficult
    }
}
  
module.exports = { calculateSeoScore, calculateReadableScore };
  