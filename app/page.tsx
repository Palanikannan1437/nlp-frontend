import Hero from './hero';
import Footer from './footer';
import Pricing from './pricing';
import { getSession } from '@/lib/session';

export default async function Home() {
  const session = getSession();

  return (
    <>
      <Hero session={session} />
      <Pricing />
      <Footer />
    </>)
}
