import { FC } from "react";

import { useRouter } from "next/router";
import { Card, Grid, Row, Text } from "@nextui-org/react";

import { SmallPokemon } from "@/interfaces"


interface Props {
    pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
    const { id, name, url, img } = pokemon;

    const router = useRouter();

    const onClick = () => {
      // router.push(`/pokemon/${id}`)
      router.push(`/name/${name}`)
    }


  return (
    <>
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 }>
        <Card isHoverable isPressable onClick={ onClick }>
            <Card.Body css={{ padding: 1 }}>
              <Card.Image src={ img } alt='imgPoke'/>
            </Card.Body>
            
            <Card.Footer>
              <Row justify="space-between">
                <Text transform="capitalize">{ name }</Text>
                <Text>#{ id }</Text>
              </Row>
            </Card.Footer>
        
        </Card>
    </Grid>
    </>
  )
}

