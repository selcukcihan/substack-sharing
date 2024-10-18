'use client'

import { checkUrl } from '../core/stuff'
import { redirect } from 'next/navigation'

export const Redirecter = (props: any) => {
  const url = props.url
  if (!checkUrl(url)) {
    redirect('/not-found')
  } else {
    window.location.replace(url)
  }
  return <> </>
}
