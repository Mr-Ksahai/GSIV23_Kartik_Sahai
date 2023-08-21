import MovieDetail from '@/components/movieDetail'
import React from 'react'

function page() {
  return (
    <div>
        <MovieDetail
              title={'Movie Title'}
              vote_average={'(6)'}
              overview='ygxyux uyxguxx yxuyx uwxy wxy wux wyx'
              poster_path='https://image.tmdb.org/t/p/w500//lCanGgsqF4xD2WA5NF8PWeT3IXd.jpg'
              cast='shriyam'
              director='Christopher'
              runtime='32:32'
              release_date='2012' id={0}        />
    </div>
  )
}

export default page