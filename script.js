// search button handler (click)

document.getElementById("search-btn").addEventListener("click", searchResult)

// Search in pressing Enter button

const inputTitle = document.getElementById('title-input');

inputTitle.addEventListener('keypress', function () {
    if (event.keyCode === 13) {
        searchResult();
    }
})


// APi Call an other functions

function searchResult() {

    document.getElementById('search-result').innerHTML = '';
    document.getElementById('lyrics').innerHTML = '';

    const title_name = document.getElementById("title-input").value;

    fetch(`https://api.lyrics.ovh/suggest/${title_name}`)
        .then(response => response.json())
        .then(data => {
            fetchData = data;
            for (let i = 0; i < data.data.length; i++) {
                const title = data.data[i].title;
                const artist = data.data[i].artist.name;
                document.getElementById('search-result').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                                        <div class="col-md-6">
                                                                            <h3 class="lyrics-name">${title}</h3>
                                                                            <p class="author lead">Album by <span>${artist}</span></p>
                                                                        </div>
                                                                        <div class="col-md-6 text-md-right text-center">
                                                                            <a href="#lyrics"><button onClick="getDetails(${i})" class="btn btn-success">Get Details</button></a>
                                                                            <a href="#lyrics"><button onClick="getLyrics(${i})" class="btn btn-success">Get Lyrics</button></a>
                                                                        </div>
                                                                    </div>`
                if (i == 9) {
                    break;
                }
            }


        })

}


function getDetails(index) {

    const title = fetchData.data[index].title;
    const artist = fetchData.data[index].artist.name;
    const cover = fetchData.data[index].album.cover_medium;
    const buySong = fetchData.data[index].link;
    
    document.getElementById('lyrics').innerHTML = `<div class="details">
                                                                        <h2 class="text-success mb-4">Song Details</h2>
                                                                        <img src="${cover}" alt="">
                                                                        <h5>Song Title: ${title}</h5>
                                                                        <h5>Artist Name: ${artist}</h5>
                                                                        <h5><a target="_blank" href="${buySong}">Buy this Song</a></h5>
                                                                    </div>`


}


function getLyrics(index) {

    const artist = fetchData.data[index].artist.name;
    const title = fetchData.data[index].title;
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            let lyrics = data.lyrics;
            if (lyrics == undefined) {
                lyrics = `Lyrics Not Found.`;
            }
            document.getElementById('lyrics').innerHTML = `<div class="single-lyrics text-center">
                                                                            <button class="btn go-back">&lsaquo;</button>
                                                                            <h2 class="text-success mb-4">Song Lyrics</h2>
                                                                             <pre style="color:white"> ${lyrics} </pre>
                                                                        </div>`
        })

}