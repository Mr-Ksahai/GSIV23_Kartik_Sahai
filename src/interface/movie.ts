export interface IMovie {
    id: number;
    poster_path: string;
    title: string;
    cast: any;
    director: any;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
  }

  export interface CastMember {
    name: string;
  
  }
  
  export interface CrewMember {
    name: string;
    job: string;
   
  }