'use server'

import { redirect } from 'next/navigation'
import ogs from 'open-graph-scraper'
import '../globals.css'
import { checkUrl } from '../../core/stuff'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const url = decodeURIComponent(searchParams.url as string)
  if (!url) {
    return {}
  }

  console.log('Fetching metadata from', url)

  if (!checkUrl(url)) {
    return {}
  } else {
    try {
      const { error, result } = await ogs({url})
      if (error) {
        console.error('Error fetching metadata', error, result)
        return {}
      }
      const title = result.ogTitle
      const metaDescription = result.ogDescription
      const images = [{
        url: result.twitterImage?.[0].url,
        width: 360,
        height: 360,
        alt: metaDescription,
      }]
      return {
        title: title,
        description: metaDescription,
        applicationName: title,
        keywords: ['books', 'reading', 'bookshelf', 'personal', 'list', 'notes', 'ratings', 'library', 'bookworm', 'booklover', 'kindle', 'goodreads', 'bookclub', 'bookstore', 'bookshop', 'bookcase', 'bookstack', 'bookshelfie', 'bookstagram', 'bookphotography', 'bookcommunity', 'bookaddict', 'bookaholic', 'booknerd', 'bookgeek', 'bookish', 'bookdragon', 'bookworms', 'booklovers', 'bookclubs', 'bookstores', 'bookshops', 'bookcases', 'bookstacks', 'bookshelves', 'bookstagrammer', 'bookphotographer', 'bookcommunitys', 'bookaddicts', 'bookaholics', 'booknerds', 'bookgeeks', 'bookishs', 'bookdragons'],
        twitter: {
          card: 'summary',
          title: title,
          description: metaDescription,
          creator: '@scihan',
          site: '@scihan',
          images,
        },
        openGraph: {
          siteName: title,
          title: title,
          type: 'website',
          url: result.ogUrl,
          description: metaDescription,
          images,
        },
      }
    } catch (error) {
      console.error('Error fetching metadata', error)
      return {}
    }
  }
}

// This page receives a link that is URI encoded, as query parameter.
// It fetches the URL and displays the opengraph metadata from that post.
// It then redirects to the URL.

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const url = searchParams.url as string
  console.log('Redirecting to', url)
  if (!checkUrl(url)) {
    redirect('/not-found')
  } else {
    redirect(url)
  }
}
