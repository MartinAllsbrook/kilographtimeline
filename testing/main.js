// This event listener waits for all HTML to be loaded before running JS
window.addEventListener('DOMContentLoaded', () => {
    // Put all the js here
    
    allTracks = document.getElementsByClassName('track'); // Grab all track on the the page
    for(let i = 0; i < allTracks.length; i++){
        if(i != 2){
            createParralax(allTracks[i]);
        }else{
            createParralax(allTracks[i]);
        }
    }
});


function createParralax(track, spacer) {
    // Declare variables
    let trackPosition = 0,
        trackHeight = 0,
        scrollFraction = 0,
        leftPercent = 0;
    
    const defaultHeight = 100,
        parallaxMultiplyer = 10;

    // Get Elements
    const frame = track.getElementsByClassName('frame')[0];
    const parallaxLayers = track.getElementsByClassName('parallax-layer');

    // Set Sizes
    track.style.width = '100%';
    track.style.height = defaultHeight.toString() + 'vh';
    // If a spacing is specified
    if(arguments.length == 2){
        // Set spacing
        track.style.marginBottom = spacer.toString() + 'vh';
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