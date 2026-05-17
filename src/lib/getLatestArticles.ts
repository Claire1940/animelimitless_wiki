import { getAllContent, CONTENT_TYPES } from '@/lib/content'
import type { ContentItem, Language } from '@/lib/content'

export interface ContentItemWithType extends ContentItem {
  contentType: string
}

/**
 * 获取最新文章（服务器端）
 * @param locale 语言
 * @param max 最大数量
 * @returns 排序后的文章列表
 */
export async function getLatestArticles(
  locale: Language,
  max: number = 30
): Promise<ContentItemWithType[]> {
  // 获取所有内容类型的文章
  const allArticles: ContentItemWithType[] = []

  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale)
    allArticles.push(...items.map(item => ({ ...item, contentType })))
  }

  // 排序：更新时间降序（优先 lastModified，回退 date）
  const sorted = allArticles.slice().sort((a, b) => {
    const getTime = (item: ContentItemWithType) => item.frontmatter.lastModified
      ? new Date(item.frontmatter.lastModified).getTime()
      : (item.frontmatter.date ? new Date(item.frontmatter.date).getTime() : 0)

    return getTime(b) - getTime(a)
  })

  return sorted.slice(0, max)
}
