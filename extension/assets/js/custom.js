
const activationButton = document.getElementById('activationButton');
const activationVideo = document.getElementById('activationVideo');

let isActive;
let localSavedData = localStorage.getItem('isActive');

if(localSavedData === null || localSavedData === 'false'){
    isActive = setData(false);
    activationVideo.src = './assets/img/activate.mp4'
}else if (localSavedData === 'true'){
    isActive = setData(true);
    activationVideo.src = './assets/img/activated.mp4';
}

activationButton.addEventListener('click',activator)

function setData(value) {
    localStorage.setItem('isActive',value);
    chrome.storage.sync.set({ isActive: value });
    return value;
}

function activator(){
    if (isActive) {
        isActive = setData(false);
        activationVideo.src = './assets/img/activate.mp4'
    }else {
        isActive = setData(true);
        activationVideo.src = './assets/img/activated.mp4'
    }
}
