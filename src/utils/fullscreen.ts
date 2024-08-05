function enterFullscreen(element: any) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    // Firefox
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    // Chrome, Safari and Opera
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    // IE/Edge
    (document as any).msExitFullscreen();
  }
}

export { enterFullscreen, exitFullscreen };
