import { useEffect, useState } from "react";
import { Card, Grid } from "@nextui-org/react";

import { FavoritePokemons } from "@/components/pokemon";
import { Layout } from "@/components/layouts";
import { Nofavorites } from "@/components/ui";

import { localFavorites } from "@/utils";

const FavoritesPage = () => {

  const [favoritePokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, [])


  return (
    <Layout title='Pókemons - Favoritos'>

      {
        favoritePokemons?.length === 0 
        ? ( <Nofavorites />)
        : ( <FavoritePokemons pokemons={ favoritePokemons }/> )
      }

    </Layout>
  )
}

export default FavoritesPage;