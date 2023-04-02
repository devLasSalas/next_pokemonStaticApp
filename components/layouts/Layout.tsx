import { FC, ReactElement, ReactNode, useEffect } from 'react';

import Head from "next/head"

import { Navbar } from '../ui';

interface Props {
    children: ReactNode;
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout = ({ children, title }: Props) => {


  return (
    <>
    <Head>
        <title>{ title }</title>
        <meta name='author' content='Carlos de las salas' />
        <meta name='description' content='Información sobre el pokémon XXXXX' />
        <meta name='keywords' content='XXXXX, pokemon, pokedex' />
        
        <meta property="og:title" content={`Informacion sobre ${ title }` }/>
        <meta property="og:description" content={`Esta es la información sobre ${ title }`} />
        <meta property="og:image" content={`${ origin }/imgs/banner.png`}/>
    </Head>

    <Navbar/>

    <main style={{
      padding: '0px 20px'
    }}>
      { children }
    </main>
    </>
  )
}
