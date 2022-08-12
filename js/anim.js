const html = document.documentElement;
const body = document.getElementsByTagName('body')[0];
// Loading Screen
window.addEventListener('load', (event) => {
    doneLoading();
});


// This waits for all HTML to be parsed before reading te JS
window.addEventListener('DOMContentLoaded', () => {
    // Writing repetitive HTML
    {
        const footer = document.getElementsByClassName('footer')[0];
        for(let i = 0; i < 14; i++) {
            footer.innerHTML = footer.innerHTML + '<a href="#y2' + (9+i).toString().padStart(3, '0') + '" class="footer-date"> <h6>2' + (9+i).toString().padStart(3, '0') +'</h6></a>';
        }
    
        const slideshow = document.getElementsByClassName('intro-slideshow')[0];
        for(let i = 1; i < 6; i++) {
            slideshow.innerHTML = slideshow.innerHTML + '<image src="assets/intro/slideshow/' + i.toString().padStart(3, '0') + '.jpg" alt="Slideshow Image">';
        }
    
        const halloweenReel = document.getElementsByClassName('halloween-reel')[0]
        for(let i = 1; i <= 7; i++) {
            halloweenReel.innerHTML = halloweenReel.innerHTML + '<image src="assets/2013/Halloween best/' + i.toString().padStart(3, '0') + '.jpg" alt="Halloween Reel Image">'
        }
    }
    // Background Collage Animation
    {
        const track = document.getElementById('years');
        // Declare variables
        let trackPosition = 0,
            trackHeight = 0,
            scrollFraction = 0,
            leftPercent = 0;

        // Get Elements
        const frame = document.getElementsByClassName('background-collage')[0];

        // What happens each scroll tick
        window.addEventListener('scroll', () => {
            // Get current track position
            trackHeight = track.getBoundingClientRect().height;
            trackPosition = -track.getBoundingClientRect().top; // Gets the current position of the track 0 is when the track is centered in the window | '-trackheight/2' moves 0 to the middle of the track | '+window.innerheight/2 moves 0 to the middle of the window
            scrollFraction = trackPosition / trackHeight; // -1 => track 1/2 into frame | 0 => track centered in frmae | 1 => track 1/2 out of frame
            // Translate scrollFraction a value that can be assligned to the frames position
            leftPercent = scrollFraction * -500 + 100; // scroll fraction -1 => 1 | left percent 100 => -100
            frame.style.left = leftPercent.toString() + '%';
        }); 
    }

    // Footer progress bar animation
    {
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
    }

    // Intro Possibilities Animation
    {
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
        });
    }

    // Start of year specific JS
    // Add horizontal scrolling / parallax to all transition sections
    {
        const transitions = document.getElementsByClassName('transition');
        for(let i = 0; i < transitions.length; i++){
            createParallax(transitions[i]);
        }
    }

    // 2010 Quatar Airport City
    createParallax(document.getElementsByClassName('y2010')[0]);

    // 2012 News
    {
        // Get elements, Create variables :)
        const track = document.getElementsByClassName('y2012')[0];

        const content = 'Kilograph’s Renderings of Cornell’s new High Tech Campus are featured in the New York Times';
        // const content2 = 'Kilograph’s Renderings were featured by the NYT once again in 2015'
        
        const typewriters = document.getElementsByClassName('typewriter');
        
        window.addEventListener('scroll', () => {
            const trackPosition = -track.getBoundingClientRect().top + window.innerHeight/2;
            const trackHeight = track.getBoundingClientRect().height;
            const scrollFraction = trackPosition / trackHeight;

            // Before
            if(scrollFraction >= -1 && scrollFraction < 0){
                body.style.backgroundColor = '#252525';
                typewriters[0].innerHTML = '';
                typewriters[1].innerHTML = '';

            // Durring
            }else if(scrollFraction >= 0 && scrollFraction <= 1){
                body.style.backgroundColor = 'white';

                writeText(typewriters[0], '2012', 100);
                writeText(typewriters[1], content, 25);


            // After
            }else if(scrollFraction > 1 && scrollFraction <= 2){
                body.style.backgroundColor = '#252525';
            }
        })
        
        function writeText(element, content, typeSpeed){
            if(element.innerHTML == ''){
                element.innerHTML = content[0]; // Instratntly place the first character so that on next call the if statement returns false
                writeChar(element, content, typeSpeed, 1); // Use writeChar to write the rest of the characters with a delay
            }
        }

        function writeChar(element, content, typeSpeed, index) {
            setTimeout(function onTick() {
                if(index < content.length){
                    element.innerHTML += content[index];
                    index++;
                    writeChar(element, content, typeSpeed, index)
                }
            }, typeSpeed);
        }
    }

    // 2013
    {
        const track = document.getElementsByClassName('y2013')[0];
        const frame = track.getElementsByClassName('frame')[0];
        const nestedFrame = document.getElementsByClassName('collage')[0];
        const panStart = 0.5;
        const panEnd = 1;
        window.addEventListener('scroll', () => {
            const trackPosition = -track.getBoundingClientRect().top;
            const trackHeight = track.getBoundingClientRect().height;
            let scrollFraction = trackPosition / trackHeight;

            // console.log(scrollFraction);

            let collageSize = 475,
                leftPercent = 0;
            // Initial zoom out of collage
            if(scrollFraction < panStart) {
                frame.style.position = 'relative';

                // Remove any movement before the frame is in view
                if(scrollFraction <= 0) {
                    scrollFraction = 0;
                }

                // Set movement variables
                collageSize = (475 - 100*(scrollFraction * 0.5/panStart)) * Math.pow((1 - (scrollFraction * 0.5/panStart)), 2);
                leftPercent = 0;

            // Pan entire frame
            }else if(scrollFraction >= panStart){
                frame.style.position = 'fixed';

                collageSize = 100;
                leftPercent = -100 * ((scrollFraction - panStart)/(panEnd - panStart));
            }

            frame.style.left = leftPercent.toString() + '%';
            nestedFrame.style.width = collageSize.toString() + '%';
            nestedFrame.style.height = collageSize.toString() + '%';
        });
    }

    // 2013 Metropolis
    createParallax(document.getElementsByClassName('metropolis')[0], 40);

    // Halloween Jack-O-Lantern Animation
    animateImages(
        document.getElementsByClassName('jackolantern')[0],
        79,
        'assets/2013/halloween-anim/'
    );

    // Halloween Gallery
    {
        const track = document.getElementsByClassName('halloween')[0];
        const frame = document.querySelector('.halloween .px-frame .halloween-reel');
        const pxframe = document.querySelector('.halloween .px-frame');
        window.addEventListener('scroll', () => {
            const trackPosition = -track.getBoundingClientRect().top;
            const trackHeight = track.getBoundingClientRect().height - 4*window.innerHeight;
            let scrollFraction = trackPosition / trackHeight;

            if(scrollFraction < 1) {
                if(scrollFraction <= 0) {
                    scrollFraction = 0;
                }
                let leftPercent = (scrollFraction) * -125;
                frame.style.left = leftPercent.toString() + '%';
                pxframe.style.left = '0%';
            }else if(scrollFraction >= 1) {
                // scrollFraction = 1;
                let leftPercent = (scrollFraction - 1) * -200;
                frame.style.left = '-125%';
                pxframe.style.left = leftPercent.toString() + '%';
            }
        });
    }

    // 2014 Parallax
    createParallax(document.getElementsByClassName('y2014')[0]);

    // 2015 Parallax
    createParallax(document.getElementsByClassName('y2015')[0]);

    // 2016 gensler Parallax
    // -=+=- 2016 OLD CODE -=+=-
    // {
        // const track = document.getElementsByClassName('gensler')[0];
        // const frame = document.querySelector('.gensler .frame');
        // const floaters = document.querySelectorAll('.gensler .floaters img');
        // const floatersInit = [233/14.4, 456/14.4, 80/14.4];
        // const backgroundFrame = document.getElementsByClassName('background-text')[0];

        // window.addEventListener('scroll', () => {
        //     // basic constants from inputs
        //     const trackPosition = -track.getBoundingClientRect().top + window.innerHeight/2;
        //     const trackHeight = track.getBoundingClientRect().height;
        //     const scrollFraction = trackPosition / trackHeight;

        //     // Create the value that will move the frame
        //     let leftPercent = (scrollFraction - 0.5) * -100;
        //     frame.style.left = leftPercent.toString() + '%';

        //     leftPercent = (scrollFraction - 0.5) * -60;
        //     backgroundFrame.style.left = leftPercent.toString() + '%';
        //     // Move floaters
        //     for(let i=0; i < floaters.length; i++){
        //         floaters[i].style.left = (floatersInit[i] + leftPercent * 0.25).toString() + '%'
        //     }
        // });
    // }
    // -=+=- 2016 OLD CODE -=+=-
    createParallax(document.getElementsByClassName('gensler')[0]);

    // 2016 zaha Parallax
    createParallax(document.getElementsByClassName('zaha')[0]);

    // 2016 wiscombe Parallax
    createParallax(document.getElementsByClassName('wiscombe')[0]);

    // 2017 Silverlake
    animateImages(
        document.getElementsByClassName('y2017')[0],
        447,
        'assets/2017/silverlake-anim/'
    );

    // 2017 Silverlake Portal Info
    createParallax(document.getElementsByClassName('silverlake-portal')[0]);
    
    // 2017 Gehry Interview
    createParallax(document.getElementsByClassName('gehry-interview')[0]);

    // 2018 Suspension House
    createParallax(document.getElementsByClassName('y2018')[0]);

    // 2018 Wireframes
    createParallax(document.getElementsByClassName('wireframes')[0]);

    // 2019 WUHO Gallery Images
    createParallax(document.getElementsByClassName('y2019')[0]);

    // 2019 Arena Tower
    createParallax(document.getElementsByClassName('arena-tower')[0]);

    // 2019 Hollywood House
    createParallax(document.getElementsByClassName('hollywood-house')[0]);

    // 2020 Television City
    createParallax(document.getElementsByClassName('y2020')[0]);

    // 2022 Earth / Dubai
    animateImages(
        document.getElementsByClassName('y2022')[0], 
        150, 
        'assets/2022/earth-image-sequence/'
    );

    // 2022 Animation Horizontal Scrolling 
    createParallax(document.getElementsByClassName('y2022')[0]);

    // 2022 Aire parallax
    createParallax(document.getElementsByClassName('aire')[0]);



    fadeIn(
        document.querySelectorAll('.transition .content'), 
        2/3, 
        '0.25s'
    );


});

const images = document.getElementsByClassName('zoomable');
clickToEnlarge(images);

// Function to create horizontal scrolling and Parralax Animations
function createParallax(track, spacer) {
    // Declare variables
    let trackPosition = 0,
        trackHeight = 0,
        scrollFraction = 0,
        leftPercent = 0;
    
    // THESE CAN BE EDIDTED TO EFFECT THE SPEED OF HORIZONTAL SCROLLING AND PARALLAX
    const defaultHeight = 100,
        parallaxMultiplyer = 11;

    // Get Elements
    const frame = track.getElementsByClassName('frame')[0];
    const parallaxLayers = track.getElementsByClassName('parallax-layer');

    // Set Sizes
    track.style.width = '100%';
    track.style.height = defaultHeight.toString() + 'vw';
    // If a spacing is specified
    if(arguments.length == 2){
        // Set spacing
        track.style.marginBottom = spacer.toString() + 'vw';
    }

    if(parallaxLayers.length == 1){
        // What happens each scroll tick
        window.addEventListener('scroll', () => {
            // Get current track position
            trackHeight = track.getBoundingClientRect().height;
            trackPosition = -track.getBoundingClientRect().top - trackHeight/2 + window.innerHeight/2; // Gets the current position of the track 0 is when the track is centered in the window | '-trackheight/2' moves 0 to the middle of the track | '+window.innerheight/2 moves 0 to the middle of the window
            scrollFraction = trackPosition / (trackHeight/2); // -1 => track 1/2 into frame | 0 => track centered in frmae | 1 => track 1/2 out of frame

            // Translate scrollFraction a value that can be assligned to the frames position
            leftPercent = scrollFraction * -50; // scroll fraction -1 => 1 | left percent 100 => -100
            frame.style.left = leftPercent.toString() + '%';
        });
    }else if(parallaxLayers.length > 1){
        // What happens each scroll tick
        window.addEventListener('scroll', () => {
            // Get current track position
            trackHeight = track.getBoundingClientRect().height;
            trackPosition = -track.getBoundingClientRect().top - trackHeight/2 + window.innerHeight/2; // Gets the current position of the track 0 is when the track is centered in the window | '-trackheight/2' moves 0 to the middle of the track | '+window.innerheight/2 moves 0 to the middle of the window
            scrollFraction = trackPosition / (trackHeight/2); // -1 => track 1/2 into frame | 0 => track centered in frmae | 1 => track 1/2 out of frame

            // Translate scrollFraction a value that can be assligned to the frames position
            leftPercent = scrollFraction * -50; // scroll fraction -1 => 1 | left percent 100 => -100
            frame.style.left = leftPercent.toString() + '%';

            for(let i = 1; i < parallaxLayers.length; i++){
                parallaxLayers[i].style.left = (scrollFraction * -parallaxMultiplyer * i).toString() + '%'
            }
        });
    }
}

// Function that allows images to be clicked to enlarge them
function clickToEnlarge(images) {
    for(let i = 0; i < images.length; i++){
        // What happens to all images
        images[i].style.zIndex = '10';
        
        // What happens when an image is clicked
        images[i].addEventListener('click', () => {
            body.style.overflowY = 'hidden'
            document.getElementsByClassName('image-viewer')[0].style.display = 'flex'
            document.querySelector('.image-viewer').appendChild(images[i].cloneNode(true));

        });
    }

    document.querySelector('.image-viewer button').addEventListener('click', () => {
        body.style.overflowY = 'scroll';
        document.getElementsByClassName('image-viewer')[0].style.display = 'none'
        document.querySelector('.image-viewer .zoomable').remove();
    })
}

// Function to remove loading screen and start timeline
function doneLoading() {
    body.style.overflowY = 'scroll';
    document.getElementsByClassName('loading-screen')[0].style.display = 'none';
    console.log('JS loaded');
}

// Old Hrizontal scrolling and paralax function (DO NOT USE)
function basicParallax(track, frame, floaters, floatersInit) {
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

// Fucntion to create a scroll based animation out of a folder of JPGs
function animateImages(track, frameCount, imageLocation){
    track.style.height = frameCount.toString() + 'vh';

    let canvas = track.getElementsByTagName('canvas')[0];
    const context = canvas.getContext('2d');
    
    // I think this is is somehow a raw size that gets altered with CSS later
    canvas.height = 1080;
    canvas.width = 1920;

    // Create image object, set img source to frame one and draw it
    const img = new Image();
    img.src = currentFrame(1);
    img.onload = () => {
        context.drawImage(img, 0, 0);
    }

    preloadImages();

    // What happens each scroll tick
    window.addEventListener('scroll', () =>{
        const scrollTop = -track.getBoundingClientRect().top + window.innerHeight;
        const maxScrollTop = track.getBoundingClientRect().height;
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

    // Function to set current frame
    function currentFrame(index){
        return(imageLocation + index.toString().padStart(4, '0') + '.jpg');
    }

    // Function to update image
    function updateImage(index){
        img.src = currentFrame(index);
        context.drawImage(img, 0, 0);
    }

    // Function to preload images in order to prevent lag while scrolling
    function preloadImages(){
        for (let i = 1; i < frameCount; i++){
            const img = new Image();
            img.src = currentFrame(i);
        }
    }
}

// Idk if I really need this function lmao, fades in content.
function fadeIn(elements, screenPercent, time) {
    for(let i = 0; i < elements.length; i++){
        // Make element opacity fade
        elements[i].style.transition = 'opacity '+ time +' linear';

        // Raise / lower opacity at the right point
        window.addEventListener('scroll', () => {
            const elementPosition = elements[i].getBoundingClientRect().top;
            if(elementPosition < window.innerHeight*screenPercent){
                elements[i].style.opacity = '100%';
            } else {
                elements[i].style.opacity = '0%';
            }
        });
    }

}

console.log('All JS Loaded');