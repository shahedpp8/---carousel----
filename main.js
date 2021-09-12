let el = document.getElementById("drag-wrapper");
let hmm = new Hammer(el);
let position = 0;
const max = el.querySelectorAll('.drag-item').length;

hmm.get('pan').set({ threshold: 0, direction: Hammer.DIRECTION_ALL });

function calc(v) {
  return .8 * Math.sign(v) * Math.sqrt(Math.abs(v));
}

hmm.on('pan', function(ev) {
  el.style.transitionDuration = '0s';
  el.style.transform = `translateX(${-position*100+calc(ev.deltaX)}%)`;
});

hmm.on('panend', function(ev) {
  el.style.transitionDuration = '.5s';
  el.style.opacity = '1';

  if (ev.deltaX <= -75 && position < max-1) {
    position += 1;
  }

  else if (ev.deltaX >= 75 && position > 0) {
    position -= 1;
  }

  el.style.transform = `translateX(-${position*100}%)`;
});