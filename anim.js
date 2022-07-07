// Footer progress bar animation
const html = document.documentElement;
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

// Possibilities animation
const possibilitiesTrack = document.getElementsByClassName('possibilities-track')[0];
const possibilitiesFrame = document.getElementsByClassName('possibilities-frame')[0];
const yearsOfHolder = document.getElementsByClassName('years-of-holder')[0];

window.addEventListener('scroll', () => {
    const scrollTop = possibilitiesTrack.getBoundingClientRect().top;
    const maxScrollTop = possibilitiesTrack.getBoundingClientRect().height - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const maxDisplacement = 100;

    const displacement = Math.min(
        0,
        Math.max(
            -maxDisplacement,
            Math.floor(scrollFraction * maxDisplacement)
        )
    );
    possibilitiesFrame.style.left = displacement.toString() + 'vw';
    yearsOfHolder.style.left = displacement.toString() + 'vw';
})

// 2022 Earth animation
const y2022Track = document.getElementsByClassName('y2022-track')[0];
const y2022Frame = document.getElementsByClassName('y2022-frame')[0];

const currentFrame = index => (
    `assets/2022/earth-image-sequence/Image sequence${index.toString().padStart(3, '0')}.jpg`
)

window.addEventListener('scroll', () => {
    const scrollTop = y2022Track.getBoundingClientRect().top;
    const maxScrollTop = y2022Track.getBoundingClientRect().height - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const lastFrame = 100;

    const frame = Math.min(
        0,
        Math.max(
            -lastFrame,
            Math.floor(scrollFraction * lastFrame)
        )
    );
    
})

