import { FC, ReactElement, ReactNode } from "react"

import Head from "next/head"

import { Navbar } from '../ui';

interface Props {
    children: ReactNode;
    title: string;
}

export const Layout = ({ children, title }: Props) => {
  return (
    <>
    <Head>
        <title>{ title }</title>
        <meta name='author' content='Carlos de las salas' />
        <meta name='description' content='Información sobre el pokémon XXXXX' />
        <meta name='keywords' content='XXXXX, pokemon, pokedex' />
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
