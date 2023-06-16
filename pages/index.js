import Router from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { routes } from '@/constants/routes'
import DocHeader from '@/components/DocHeader'
import Navbar from '@/components/NavBar'
import OpeningSection from '@/components/OpeningSection'
import SecondSection from '@/components/SecondSection'
import ContactSection from '@/components/ContactSection'
import FooterSection from '@/components/FooterSection'

export default function Home() {
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      Router.push(routes.JOBS)
    }
  }, [user])

  return (
    <div>
      <DocHeader
        DocTitle='Placify.io'
      />
        <Navbar />
        <OpeningSection />
        <SecondSection />
        <ContactSection />
        <FooterSection />
    </div>
  )
}
