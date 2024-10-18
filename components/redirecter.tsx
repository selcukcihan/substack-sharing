'use client'

import { checkUrl } from '../core/stuff'
import { redirect } from 'next/navigation'

export const Redirecter = (props: any) => {
  const url = props.url
  if (!checkUrl(url)) {
    redirect('/not-found')
  } else {
    if (global?.window) {
      global?.window?.location.replace(url)
    }
  }
  return <> </>
}
