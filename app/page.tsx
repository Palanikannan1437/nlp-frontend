import { getUsers } from './db';
import Hero from './hero';
import Footer from './footer';
import Pricing from './pricing';
import { getSession } from '@/lib/session';

export default async function Home() {
  const users = await getUsers();

  const session = getSession();

  return (
    <>
      <Hero session={session} />
      {/* <div className="container my-12 mx-auto px-4 md:px-12"> */}
      {/*   <div className="flex flex-wrap -mx-1 lg:-mx-4"> */}
      {/*     {users.map(user => { */}
      {/*       return ( */}
      {/*         <div key={user.id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"> */}
      {/*           <article className="overflow-hidden rounded-lg shadow-lg"> */}
      {/*             <a href="#"> */}
      {/*               <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" /> */}
      {/*             </a> */}
      {/*             <header className="flex items-center justify-between leading-tight p-2 md:p-4"> */}
      {/*               <h1 className="text-lg"> */}
      {/*                 <a className="no-underline hover:underline text-black" href="#"> */}
      {/*                   {user.occupation} */}
      {/*                 </a> */}
      {/*               </h1> */}
      {/*               <p className="text-grey-darker text-sm"> */}
      {/*                 {user.age} */}
      {/*               </p> */}
      {/*             </header> */}
      {/*             <footer className="flex items-center justify-between leading-none p-2 md:p-4"> */}
      {/*               <a className="flex items-center no-underline hover:underline text-black" href="#"> */}
      {/*                 <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" /> */}
      {/*                 <p className="ml-2 text-sm"> */}
      {/*                   {user.name} */}
      {/*                 </p> */}
      {/*               </a> */}
      {/*               <a className="no-underline text-grey-darker hover:text-red-dark" href="#"> */}
      {/*                 <span className="hidden">Like</span> */}
      {/*                 <i className="fa fa-heart"></i> */}
      {/*               </a> */}
      {/*             </footer> */}
      {/*           </article> */}
      {/*         </div> */}
      {/*       ) */}
      {/*     })} */}
      {/*   </div> */}
      {/* </div> */}
      <Pricing />
      <Footer />
    </>)
}
