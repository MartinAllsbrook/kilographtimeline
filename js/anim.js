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



// 2013
{
    const track = document.getElementsByClassName('y2013')[0];
    const frame = document.querySelector('.y2013 .frame');
    const nestedFrame = document.getElementsByClassName('collage')[0];
    const panStart = 0.2;
    const panEnd = 0.8;
    window.addEventListener('scroll', () => {
        const trackPosition = -track.getBoundingClientRect().top;
        const trackHeight = track.getBoundingClientRect().height - window.innerHeight;
        let scrollFraction = trackPosition / trackHeight;
        // console.log(scrollFraction);

        let collageSize = 450,
            leftPercent = 0;
        // Initial zoom out of collage
        if(scrollFraction < panStart) {
            // Remove any movement before the frame is in view
            if(scrollFraction <= 0) {
                scrollFraction = 0;
            }

            // Set movement variables
            collageSize = (450 - 100*(scrollFraction * 0.5/panStart)) * Math.pow((1 - (scrollFraction * 0.5/panStart)), 2);
            leftPercent = 0;

        // Pan entire frame
        }else if(scrollFraction >= panStart && scrollFraction < panEnd){
            collageSize = 100;
            leftPercent = -180 * ((scrollFraction - panStart)/(panEnd - panStart));
            document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
        
        // Post pan actions
        }else if(scrollFraction >= panEnd) {
            collageSize = 100;
            leftPercent = -180;
            document.getElementsByTagName('body')[0].style.backgroundColor = '#252525';
        }




        frame.style.left = leftPercent.toString() + '%';
        nestedFrame.style.width = collageSize.toString() + '%';
        nestedFrame.style.height = collageSize.toString() + '%';
    });
}
//         y2013Frame.style.width = '100vw';
//         y2013Frame.style.height = '100vh';
//     }else if(scrollFraction < panEnd){
//         const left = -panTotal * (scrollFraction - panStart);
//         y2013Frame.style.left = left.toString() + 'px';
//     }else if(scrollFraction < 0.93 && scrollFraction > panEnd){
//         document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
//         y2013Frame.style.display = 'block';
//     }else if(scrollFraction > 0.93 && scrollFraction < 1) {
//         document.getElementsByTagName('body')[0].style.backgroundColor = '#252525'
//         y2013Frame.style.display = 'none';
//     }
// });

// Halloween
{
    const track = document.getElementsByClassName('halloween')[0];
    const frame = document.querySelector('.halloween .px-frame .halloween-reel');
    const pxframe = document.querySelector('.halloween .px-frame');
    window.addEventListener('scroll', () => {
        const trackPosition = -track.getBoundingClientRect().top;
        const trackHeight = track.getBoundingClientRect().height - 4 * window.innerHeight;
        let scrollFraction = trackPosition / trackHeight;

        if(scrollFraction < 1) {
            if(scrollFraction <= 0) {
                scrollFraction = 0;
            }
            let leftPercent = (scrollFraction) * -200;
            frame.style.left = leftPercent.toString() + '%';
            pxframe.style.left = '0%';
        }else if(scrollFraction >= 1) {
            // scrollFraction = 1;
            let leftPercent = (scrollFraction - 1) * -200;
            frame.style.left = '-200%';
            pxframe.style.left = leftPercent.toString() + '%';
        }
    });
}


// 2014 parralax
window.addEventListener('scroll', () => basicParralax(
    document.getElementsByClassName('y2014')[0], 
    document.querySelector('.y2014 .frame'), 
    document.querySelectorAll('.y2014 .floaters img'), 
    [681/14.40, 99/14.40, 146/14.40]
));

// 2015 parralax
window.addEventListener('scroll', () => basicParralax(
    document.getElementsByClassName('y2015')[0],
    document.querySelector('.y2015 .frame'),
    document.querySelectorAll('.y2015 .floaters img'),
    [127/14.40, 178/14.40, 732/14.40, 1465/14.40]
));

// 2016 parralax
window.addEventListener('scroll', () => basicParralax(
    document.getElementsByClassName('y2016')[0],
    document.querySelector('.y2016 .frame'),
    document.querySelectorAll('.y2016 .floaters img'),
    [233/14.40, 426/14.40]
));

// Basic Parralax function
function basicParralax(track, frame, floaters, floatersInit) {
    // basic constants from inputs
    const trackPosition = -track.getBoundingClientRect().top + window.innerHeight/2;
    const trackHeight = track.getBoundingClientRect().height;
    const scrollFraction = trackPosition / trackHeight;

    // Create the value that will move the frame
    let leftPercent = (scrollFraction - 0.5) * -100;
    frame.style.left = leftPercent.toString() + '%';

    // Move floaters
    for(let i=0; i < floaters.length; i++){
        floaters[i].style.left = (floatersInit[i] + leftPercent * 0.25).toString() + '%'
    }
}

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