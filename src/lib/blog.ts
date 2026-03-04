import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPostMeta {
  title: string
  slug: string
  meta_title: string
  meta_description: string
  target_keyword: string
  secondary_keywords: string[]
  pillar: string
  content_type: string
  date: string
  author: string
  word_count: number
  reading_time: string
}

export interface BlogPostFull extends BlogPostMeta {
  content: string
  htmlContent: string
}

function getReadingTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}

function getWordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  const posts = files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      const slug = data.slug || filename.replace(/\.mdx?$/, '')
      const wordCount = data.word_count || getWordCount(content)

      return {
        title: data.title || 'Untitled',
        slug,
        meta_title: data.meta_title || data.title || 'Untitled',
        meta_description: data.meta_description || '',
        target_keyword: data.target_keyword || '',
        secondary_keywords: data.secondary_keywords || [],
        pillar: data.pillar || '',
        content_type: data.content_type || 'guide',
        date: data.date || '',
        author: data.author || 'Peptide Nerds Editorial',
        word_count: wordCount,
        reading_time: getReadingTime(wordCount),
      } satisfies BlogPostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}

export function getPost(slug: string): BlogPostFull | null {
  if (!fs.existsSync(BLOG_DIR)) return null

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const fileSlug = data.slug || filename.replace(/\.mdx?$/, '')
    if (fileSlug !== slug) continue

    const wordCount = data.word_count || getWordCount(content)
    const htmlContent = marked.parse(content) as string

    return {
      title: data.title || 'Untitled',
      slug: fileSlug,
      meta_title: data.meta_title || data.title || 'Untitled',
      meta_description: data.meta_description || '',
      target_keyword: data.target_keyword || '',
      secondary_keywords: data.secondary_keywords || [],
      pillar: data.pillar || '',
      content_type: data.content_type || 'guide',
      date: data.date || '',
      author: data.author || 'Peptide Nerds Editorial',
      word_count: wordCount,
      reading_time: getReadingTime(wordCount),
      content,
      htmlContent,
    }
  }

  return null
}

export function getPostsByPillar(pillar: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.pillar === pillar)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const post = getAllPosts().find((p) => p.slug === slug)
  if (!post) return []

  return getAllPosts()
    .filter((p) => p.slug !== slug && p.pillar === post.pillar)
    .slice(0, limit)
}
