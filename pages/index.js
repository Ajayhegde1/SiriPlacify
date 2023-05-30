import Router from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { routes } from '@/constants/routes'

export default function Home () {
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      Router.push(routes.JOBS)
    } else {
      Router.push(routes.SIGN_IN)
    }
  }, [])

  return (
    <main />
  )
}
