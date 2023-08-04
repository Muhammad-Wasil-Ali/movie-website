const apikey="01dae18f0d4447692e79ca3c5a44d3ad";
const apiEndpoint="https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths={
    fetchAllCategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList:(id)=>  `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,

}

function iniit(){
    fetchTrendingMovies()
 fetchAndBuildAllSections()
}

function fetchTrendingMovies(){
    fetchbuildMovieSection(apiPaths.fetchTrending,"Trending Now").then(list=>{
        const random= parseInt(Math.random()*list.length);
        buildBannerSection(list[random])
    }).catch(err=>{
        console.log(err);
    })

}

function buildBannerSection(movie){
    const bannerCont=document.getElementById('banner-section')
    bannerCont.style.backgroundImage=`url(${imgPath}${movie.backdrop_path})`;

    const div=document.createElement('div');
    div.innerHTML=`
    
    <h2 class="banner-title">${movie.title}</h2>
    <p class="banner-info">Trending in Movies | Release ${movie.release_date}</p>
    <p class="banner-overview">${movie.overview}</p>
  <div class="action-buttons-cont">
    <button class="action-button">Play

    </button>
    <button class="action-button">
        More Info
    </button>
  </div>
`
div.className="banner-content container";
    bannerCont.append(div);
}

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())
    .then(res=>{
            const categories=res.genres;
            if(Array.isArray(categories) && categories.length){
                categories.forEach(category=>{
                    fetchbuildMovieSection(apiPaths.fetchMovieList(category.id),category.name)
                });
            }
    })
    .catch(err=>console.log(err))
    
}

function fetchbuildMovieSection(fetchUrl,categoryName){
   return fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        const movies=res.results;
        if(Array.isArray(movies) && movies.length){
            buildMoviesSection(movies,categoryName);
        }
        return movies;
    })
    .catch(err=>console.log(err))
    
}

function buildMoviesSection(list,categoryName){
    console.log(list,categoryName);
    const moviesConst=document.getElementById("movies-cont");
   const moviesList= list.map((item)=>{
        return ` 
        <img src="${imgPath}${item.backdrop_path}" alt="" class="movies-item">
        `
    }).join('');

    const moviesSectionHtml=`
    <h2 class="heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
    <div class="movies-row">
       ${moviesList}
    </div>
    `

    console.log(moviesSectionHtml);
    const div=document.createElement('div');
    div.className="movies-section";
    div.innerHTML=moviesSectionHtml;

    moviesConst.append(div);
}



window.addEventListener("load",function(){
iniit();

this.window.addEventListener('scroll',function(){
    const header=document.getElementById('header')
    if (window.scrollY > 5) header.classList.add('black-bg')
    else header.classList.remove('black-bg');
    
})
})