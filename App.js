/* https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1 */
// append poster path on this link--->
const URL="https://image.tmdb.org/t/p/original";

async function fetchMovies(page=1){
    try{
    let response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`
    );
    response= await response.json();
    
    renderMovies(response.results)
}catch(error){
    console.log(error);
}
}
function renderMovies(movies){
const moviesList=document.getElementById("movies-list");
 movies.forEach((movie)=>{
    const {poster_path,title,vote_average,vote_count}=movie;
    const listItem=document.createElement("li");
    listItem.className="card";
    let imageSource=poster_path?`${URL}/${poster_path}`
    : "https://ichef.bbci.co.uk/images/ic/640x360/p09082fy.jpg";
    const imageTag=`
<img
class='poster'
src=${imageSource}
alt=${title}
/>`
listItem.innerHTML+=imageTag;
const titleTag=`<p class="title">${title}</p>`;
listItem.innerHTML+=titleTag;
let sectionTag= `<section class="vote-favouriteIcon">
<section class="vote">
<p class="vote-count">Votes: ${vote_count}</p>
<p class="vote-rating">Rating: ${vote_average}</p>
</section>
<i class="fa-regular fa-heart fa-2xl favourite-icon"></i>
</section>

`
listItem.innerHTML +=sectionTag;
moviesList.appendChild(listItem);
});

}
fetchMovies();