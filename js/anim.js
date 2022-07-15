const html = document.documentElement;

// Footer progress bar animation
const footerFill = document.getElementsByClassName('footer-fill')[0];

window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const viewportWidth = window.innerWidth;

    const fillWidth = Math.min(
        viewportWidth,
        Math.floor(scrollFraction * viewportWidth)
    );
    footerFill.style.width = fillWidth.toString() + 'px';
});

// Intro Possibilities Animation
const possibilitiesTrack = document.getElementsByClassName('possibilities')[0];
const possibilitiesFrame = document.querySelector('.possibilities .frame');
const yearsOfHolder = document.getElementsByClassName('years-of-holder')[0];

window.addEventListener('scroll', () => {
    const scrollTop = -(possibilitiesTrack.getBoundingClientRect().top);
    const maxScrollTop = possibilitiesTrack.getBoundingClientRect().height - window.innerHeight;
    let scrollFraction = scrollTop / maxScrollTop;

    if(scrollFraction <= 0) {
        scrollFraction = 0;
    }else if(scrollFraction >= 1) {
        scrollFraction = 1;
    }
    // console.log(scrollFraction);

    const moveDistance = -(document.querySelector('.possibilities img').offsetWidth);
    const moveEnd = 0.85;

    let pxTotal = 0;
    if(scrollFraction <= moveEnd){
        pxTotal = moveDistance * (scrollFraction / moveEnd);
    } else {
        pxTotal = moveDistance;
    }

    possibilitiesFrame.style.left = pxTotal.toString() + 'px';
    yearsOfHolder.style.left = pxTotal.toString() + 'px';
})

// 2013 parralax animation
const y2013Track = document.getElementsByClassName('y2013')[0];
const y2013Frame = document.querySelector('.y2013 .frame');

window.addEventListener('scroll', () => {
    const scrollTop = -(y2013Track.getBoundingClientRect().top);
    const maxScrollTop = y2013Track.getBoundingClientRect().height - window.innerHeight;
    let scrollFraction = scrollTop / maxScrollTop;

    if(scrollFraction <= 0) {
        scrollFraction = 0;
    }else if(scrollFraction >= 1) {
        scrollFraction = 1;
    }
    console.log(scrollFraction);

    const moveDistance = -(y2013Frame.offsetWidth)*2;
    const moveEnd = 1;
    // let pxTotal = possWidth * (animationPercent / 100);

    let pxTotal = 0;

    pxTotal = moveDistance * (scrollFraction / moveEnd) - moveDistance/2;

    // if(scrollFraction <= moveEnd){
    //     pxTotal = moveDistance * (scrollFraction / moveEnd);
    // } else {
    //     pxTotal = moveDistance;
    // }

    y2013Frame.style.left = pxTotal.toString() + 'px';
})










// 2022 Earth animation
const canvas = document.querySelector('.dubai-project-animation');
const y2022Track = document.getElementsByClassName('y2022-track')[0];
const y2022Frame = document.getElementsByClassName('y2022-frame')[0];
const context = canvas.getContext('2d');

// Set current frame
const currentFrame = index => (
    `assets/2022/earth-image-sequence/Image sequence${index.toString().padStart(3, '0')}.jpg`
)

const frameCount = 149;

canvas.height = 1080;
canvas.width = 1920;

// Create image object, set img source to frame one and draw it
const img = new Image();
img.src = currentFrame(1);
img.onload = function(){
    context.drawImage(img, 0, 0);
}

// Function to update image
const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
}

// What happens each scroll tick
window.addEventListener('scroll', () =>{
    const scrollTop = -y2022Track.getBoundingClientRect().top;
    const maxScrollTop = y2022Track.getBoundingClientRect().height - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    // If we are within the bounds of the animation window
    if (scrollFraction >= 0 && scrollFraction <= 1){
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );

        requestAnimationFrame( () => updateImage(frameIndex + 1));
    }
})

// Preload images to prevent lag while scrolling
const preloadImages = () => {
    for (let i = 1; i < frameCount; i++){
        const img = new Image();
        img.src = currentFrame(i);
    }
}

preloadImages();

console.log('All JS Loaded');