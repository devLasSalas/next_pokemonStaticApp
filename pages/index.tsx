import { GetStaticProps, NextPage } from "next"
import { Button, Card, Grid, Row, Text } from "@nextui-org/react"

import { Layout } from "@/components/layouts"
import { PokemonCard } from "@/components/pokemon";

import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";

interface Props {
  pokemons: SmallPokemon[]
};

export const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Pokemon App'>
      <Grid.Container gap={ 2 } justify='flex-start' >
      { pokemons.map(( poke )=> (
          <PokemonCard pokemon={ poke } key={ poke.id }/>
      ))}
      </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {


  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map(( poke, i ) => (
    {
      ...poke,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
    }
  ))
  // console.log(pokemons)


  return {
    props: {
      pokemons,
    }
  }
}


export default HomePage;

