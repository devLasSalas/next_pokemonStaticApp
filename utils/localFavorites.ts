
 const toggleFavorite = ( id: number ) => {

    console.log('toggleFavorite llamado')
    
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if( favorites.includes(id) ) {
        favorites = favorites.filter( pokeId => pokeId !== id );
    }else {
        favorites.push(id);
    }

    localStorage.setItem( 'favorites', JSON.stringify(favorites) );

}

const existFavorites = ( id: number ): Boolean => {

    if( typeof window === 'undefined' ) return false;

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes( id );

}


export default {
    existFavorites,
    toggleFavorite,

}