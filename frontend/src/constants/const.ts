export const BACKEND_URL = `https://verbly.vedanshi3012p.workers.dev/api/v1/`;
// export const BACKEND_URL = `http://localhost:8787/api/v1/` 

export function ReadingTime(text: string) {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return {
        text: `${readingTimeMinutes} min read`,
        minutes: readingTimeMinutes,
        time: readingTimeMinutes * 60 * 1000,
        words: wordCount
    };
}

