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
const possibilitiesFrame = document.querySelector('.possibilities .poss-frame');
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

// 2012 News
const y2012 = document.getElementsByClassName('y2012')[0];
const content = 'Kilograph’s Renderings of Cornell’s new High Tech Campus are featured in the New York Times';
const content2 = 'Kilograph’s Renderings were featured by the NYT once again in 2015'
let entered = false;
let entered1 = false;
let entered2 = false;
const typewriters = document.getElementsByClassName('typewriter');

window.addEventListener('scroll', () => {


    const position = y2012.getBoundingClientRect().top - window.innerHeight*5/6;


    if(position <= 0 && position >= (-window.innerHeight) && entered == false){
        document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
        writeText('2012', typewriters[0], 100, 0);
        entered = true;
    }

    if(typewriters[1].getBoundingClientRect().top - window.innerHeight*5/6 <= 0 && entered1 == false){
        writeText(content, typewriters[1], 25, 0);
        entered1 = true;
    }

    if(typewriters[2].getBoundingClientRect().top - window.innerHeight*5/6 <= 0 && entered2 == false){
        writeText(content2, typewriters[2], 25, 0);
        entered2 = true;
    }
})

function writeText(content, typewriter, typeSpeed, index) {
    setTimeout(function onTick() {
        if(index < content.length){
            typewriter.innerHTML += content[index];
            index++;
            writeText(content, typewriter, typeSpeed, index)
        }
    }, typeSpeed);
}



// 2013 parralax animation
const y2013Track = document.getElementsByClassName('y2013')[0];
const y2013Frame = document.getElementsByClassName('c3-collage-frame')[0];

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

    const panPoint = 0.2;
    const panEnd = 0.7;
    const panTotal = 5040;
    // Zoom out initially
    if(scrollFraction < panPoint) {
        // start at 400% end with 400%*0.25=100% maybe scale with ^2
        const scale = 400 * Math.pow((1 - scrollFraction * (0.5/0.2)),2);
        // console.log(scale);
        
        y2013Frame.style.width = scale.toString() + 'vw';
        y2013Frame.style.height = scale.toString() + 'vh';
    }else if(y2013Frame.style.width != '100vw' && y2013Frame.style.height != '100vh'){
        const left = -panTotal * (scrollFraction - panPoint);
        y2013Frame.style.left = left.toString() + 'px';

        y2013Frame.style.width = '100vw';
        y2013Frame.style.height = '100vh';
    }else if(scrollFraction < panEnd){
        const left = -panTotal * (scrollFraction - panPoint);
        y2013Frame.style.left = left.toString() + 'px';
    }else if(scrollFraction < 0.93 && scrollFraction > panEnd){
        document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
        y2013Frame.style.display = 'block';
    }else if(scrollFraction > 0.93 && scrollFraction < 1) {
        document.getElementsByTagName('body')[0].style.backgroundColor = '#252525'
        y2013Frame.style.display = 'none';
    }
    
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