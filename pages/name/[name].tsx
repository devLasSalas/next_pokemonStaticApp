
import { useEffect, useState } from "react";

import { GetStaticProps,GetStaticPaths,NextPage } from "next";
import { useRouter } from "next/router";

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from 'canvas-confetti'; 

import { Layout } from "@/components/layouts"

import { pokeApi } from "@/api";

import { localFavorites, getPokemonInfo } from "@/utils";

import { Pokemon, PokemonListResponse } from "@/interfaces";





interface Props {
  pokemon: Pokemon;
}

const PokemonPageByName: NextPage<Props> = ({ pokemon }) => {

  console.log({ pokemon });

  const [isInFavorites, setIsInFavorites]  = useState(false);

  useEffect(() => {
   const result: Boolean =  localFavorites.existFavorites( pokemon.id );
   setIsInFavorites( result ? true : false );
  }, [])
  
  

  const router = useRouter();
  
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites( !isInFavorites );

    if( isInFavorites ) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 100,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })

  }
  
//   const IsInFavorites = isInFavorites ? 'En Favoritos' : 'Guardar en favoritos';

  return (
    <Layout title={ pokemon.name }>
      
      <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }>
        
        <Grid xs={ 12 } sm={ 4 }>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
              src={ pokemon.sprites.other?.dream_world.front_default || '/not-image.png' }
              alt={ pokemon.name }
              width='100%'
              height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text transform="capitalize" h1 >{ pokemon.name }</Text>
              <Button color='gradient' onClick={ onToggleFavorite }>
               { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            
            <Card.Body>
              <Text size={ 30 }>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image 
                src={ pokemon.sprites.front_default } 
                alt={pokemon.name} 
                width={ 100 }
                height={ 100 }
                />
                <Image 
                src={ pokemon.sprites.back_default } 
                alt={pokemon.name} 
                width={ 100 }
                height={ 100 }
                />
                <Image 
                src={ pokemon.sprites.front_shiny } 
                alt={pokemon.name} 
                width={ 100 }
                height={ 100 }
                />
                <Image 
                src={ pokemon.sprites.back_shiny } 
                alt={pokemon.name} 
                width={ 100 }
                height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      
      </Grid.Container>

    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemonsName: string[] = data.results.map(pokemon => pokemon.name);

  // console.log(pokemons151)

  return {
      paths: pokemonsName.map( name => ({
        params: { name }
      })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo( name ); 
  return {
    props: {
      pokemon
    }
  }
}

export default PokemonPageByName;