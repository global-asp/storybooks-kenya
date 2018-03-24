document.addEventListener('play', function(e) {
  var audios = document.getElementsByTagName('audio');
  for (var i = 0, len = audios.length; i < len; i++) {
    if (audios[i] != e.target) {
      audios[i].currentTime = 0;
      audios[i].pause();
    }
  }
}, true);

function playpause(n) {
  p = document.getElementById('audio' + n);
  pbutton = document.getElementById("playbutton" + n);
  if (p.paused) {
    p.play();
    pbutton.innerHTML = '<i class="icon-pause"></i>';
  } else {
    p.pause();
    pbutton.innerHTML = '<i class="icon-volume-up"></i>';
  }
}

function switchlang(d,l) {
  en = document.getElementsByClassName("en");
  sw = document.getElementsByClassName("sw");
  def = document.getElementsByClassName("def");
  btn_en = document.getElementsByClassName("lang-en");
  btn_sw = document.getElementsByClassName("lang-sw");
  if (l == "en") {
    for (var i = 0; i < btn_en.length + 1; i++) {
      sw[i].style.display = "none";
      en[i].style.display = "block";
      def[i].style.display = "none";
      btn_en[i].innerHTML = d;
      btn_sw[i].innerHTML = "sw";
      btn_en[i].setAttribute("onclick", "switchlang('" + d + "','" + d + "')");
      btn_sw[i].setAttribute("onclick", "switchlang('" + d + "','sw')");
    }
  } else if (l == "sw") {
    for (var i = 0; i < btn_sw.length + 1; i++) {
      en[i].style.display = "none";
      sw[i].style.display = "block";
      def[i].style.display = "none";
      btn_en[i].innerHTML = "en";
      btn_sw[i].innerHTML = d;
      btn_sw[i].setAttribute("onclick", "switchlang('" + d + "','" + d + "')");
      btn_en[i].setAttribute("onclick", "switchlang('" + d + "','en')");
    }
  } else if (l == d) {
    for (var i = 0; i < btn_sw.length + 1; i++) {
      en[i].style.display = "none";
      sw[i].style.display = "none";
      def[i].style.display = "block";
      btn_en[i].innerHTML = "en";
      btn_sw[i].innerHTML = "sw";
      btn_en[i].setAttribute("onclick", "switchlang('" + d + "','en')");
      btn_sw[i].setAttribute("onclick", "switchlang('" + d + "','sw')");
    }
  }
}

function resetbutton(i) {
  pbutton = document.getElementById("playbutton" + i);
  pbutton.innerHTML = '<i class="icon-volume-up"></i>';
}

function pauseaudio() {
  var sounds = document.getElementsByTagName('audio');
  for (i=0; i<sounds.length; i++) {sounds[i].pause()};
}

function autoplay() {
  pauseaudio();
  var canonical = document.getElementsByTagName("link")[2].href;
  var id = canonical.replace(/.*\/(\d{4})\/.*/, "$1");
  var audio = document.getElementById("audio01");
  var pbutton = document.getElementById("playbutton01");
  pbutton.innerHTML = '<i class="icon-pause"></i>';
  var index = 2;
  function playNext() {
    len = document.getElementsByClassName("img-responsive").length;
    if(index <= len) {
      z = "0";
      if (index > 9) {
        z = "";
      }
      n = z + index.toString();
      p = z + (index - 1).toString();
      if (p == "9") {
	p = "09";
      }
      audio = document.getElementById("audio" + n);
      au_prev = document.getElementById("audio" + p);
      if (p == "01") {
	au_prev = document.getElementById("audio");
      }

      p3 = document.getElementById("text" + p).getElementsByClassName("def")[0].firstChild;
      p3.style = "background-color:#FFFFFF; font-weight:normal; border-radius:0px; padding:0px";
      pbutton.innerHTML = '<i class="icon-volume-up"></i>';
      window.location = "#text" + n;
      h3 = document.getElementById("text" + n).getElementsByClassName("def")[0].firstChild;
      h3.style = "background-color:#FFDC00; font-weight:bold; border-radius:5px; padding:5px";
      pbutton = document.getElementById("playbutton" + n);
      pbutton.innerHTML = '<i class="icon-pause"></i>';
      audio.load(); audio.play();
      audio.addEventListener('ended', playNext);
      index += 1;
    } else {
      pbutton.innerHTML = '<i class="icon-volume-up"></i>';
      audio.removeEventListener('ended', playNext, false);
    }
  }

  audio.addEventListener('ended', playNext);

  audio.play();
}
