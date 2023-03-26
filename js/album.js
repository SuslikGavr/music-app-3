let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`)
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let album = albums[i];
let f = 10;
/*
if(!album){
    container.innerHTML = `Редирект на главную через 5 секунд`;
    setTimeout(() => {
        window.location.href = `index.html`;
    }, 5000);
} else {
    container.innerHTML = `
        <div class="card mb-3">
            <div class="row">
                <div class="col-md-4">
                    <img src="${album.img}" alt="" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${album.title}</h5>
                        <div class="card-text">${album.description}</div>
                        <div class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></div>
                    </div>
                </div>
            </div>
        </div>
    `

    let tracks = album.tracks;
    for(let i = 0; i < tracks.length ; i++) {
        let track = tracks[i];
        playlist.innerHTML += `
            <li class="track list-group-item d-flex align-items-center">
                <img class="img-pause me-3" src="assets/play.png" alt="" height="30px">
                <img class="img-play me-3 d-none" src="assets/plays.png" alt="" height="30px">
                <div>
                    <div>${track.title}</div>
                    <div class="text-secondary">${track.Author}</div>
                </div>
                <div class="time ms-auto">${track.time}</div>
                <audio class="audio" src="${track.src}"></audio>
            </li>
        `
    }

    function setupAudio() {
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.track`); 
        let tracks = album.tracks;
        for (let i = 0; i < trackNodes.length; i++) { 
            // Один элемент
            let node = trackNodes[i];
            let timeNode = node.querySelector(`.time`)   
            // Тег аудио внутри этого элемента
            let audio = node.querySelector(`.audio`); 
            let track = tracks[i]
            // продолжи самостоятельно
            let imgPause = node.querySelector(`.img-pause`);
            let imgPlay = node.querySelector(`.img-play`);
            node.addEventListener(`click`, function () {
                // Если трек сейчас играет...
                if (track.isPlaying) {
                    track.isPlaying = false;
                    // Поставить на паузу
                    audio.pause();
                    imgPause.classList.remove(`d-none`)
                    imgPlay.classList.add(`d-none`)
                // Если трек сейчас не играет...
                } else {
                    track.isPlaying = true;
                    // Включить проигрывание
                    audio.play();
                    imgPlay.classList.remove(`d-none`)
                    imgPause.classList.add(`d-none`)
                    updateProgress();
                }
            });
            function updateProgress() {
                // Нарисовать актуальное время
                let time = getTime(audio.currentTime);
                if(time != timeNode.innerHTML) {
                    timeNode.innerHTML = time;
                }
              
                // Нужно ли вызвать её ещё раз?
                if (track.isPlaying) {
                      requestAnimationFrame(updateProgress);
                }
                
              }
        }
    }
    setupAudio();
    function getTime(time) {
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds / 60);
        let seconds = Math.floor(currentSeconds % 60);
        if(minutes < 10) {
            minutes = `0` + minutes;
        }
        if(seconds < 10) {
            seconds = `0` + seconds;
        }
        return `${minutes}:${seconds}`
    }
} */

// Если альбом не найден
if (!album) {
    // Показать ошибку
    renderError();
} else {
    // Вывод информации об альбоме
    renderAlbumInfo();

    // Вывод треков из альбома
    renderTracks();

    // Тут будет код для запуска звуков
    setupAudio();
}

// Ниже объяви все эти функции

function renderError() {
    container.innerHTML = `Редирект на главную через 5 секунд`;
    setTimeout(() => {
        window.location.href = `index.html`;
    }, 5000);
}

function renderAlbumInfo(){
    container.innerHTML = `
    <div class="card mb-3">
        <div class="row">
            <div class="col-md-4">
                <img src="${album.img}" alt="" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <div class="card-text">${album.description}</div>
                    <div class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></div>
                </div>
            </div>
        </div>
    </div>
`
}

function renderTracks() {
    let tracks = album.tracks;
    for(let i = 0; i < tracks.length ; i++) {
        let track = tracks[i];
        playlist.innerHTML += `
            <li class="track list-group-item d-flex align-items-center">
                <img class="img-pause me-3" src="assets/play.png" alt="" height="30px">
                <img class="img-play me-3 d-none" src="assets/plays.png" alt="" height="30px">
                <div>
                    <div>${track.title}</div>
                    <div class="text-secondary">${track.Author}</div>
                </div>

                <progress class="ms-5" id="progressBar" max="100" value="${f}"></progress>

                <div class="time ms-auto">${track.time}</div>
                <audio class="audio" src="${track.src}"></audio>
            </li>
        `
    }
}

function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`); 
    let tracks = album.tracks;
    for (let i = 0; i < trackNodes.length; i++) { 
        // Один элемент
        let node = trackNodes[i];
        let timeNode = node.querySelector(`.time`)   
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`); 
        let track = tracks[i]
        // продолжи самостоятельно
        let imgPause = node.querySelector(`.img-pause`);
        let imgPlay = node.querySelector(`.img-play`);
        node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (track.isPlaying) {
                track.isPlaying = false;
                // Поставить на паузу
                audio.pause();
                imgPause.classList.remove(`d-none`)
                imgPlay.classList.add(`d-none`)
            // Если трек сейчас не играет...
            } else {
                track.isPlaying = true;
                // Включить проигрывание
                audio.play();
                imgPlay.classList.remove(`d-none`)
                imgPause.classList.add(`d-none`)
                updateProgress();
            }
        });
        function updateProgress() {
            // Нарисовать актуальное время
            let time = getTime(audio.currentTime);
            if(time != timeNode.innerHTML) {
                timeNode.innerHTML = time;
            }
            // Нужно ли вызвать её ещё раз?
            if (track.isPlaying) {
                  requestAnimationFrame(updateProgress);
            }
          }
    }
}

function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    if(minutes < 10) {
        minutes = `0` + minutes;
    }
    if(seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`
}