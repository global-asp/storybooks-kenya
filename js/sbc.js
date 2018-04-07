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

function switchlang(o,c) {
  options = o.split(",");
  config = c.split(",");
  from_lang = options[0];
  to_lang = options[1];
  primary = config[0];
  secondary = config[1];
  page_lang = config[2];
  l1 = document.getElementsByClassName("l1");
  l2 = document.getElementsByClassName("l2");
  def = document.getElementsByClassName("def");
  btn_lang1 = document.getElementsByClassName("lang-primary");
  btn_lang2 = document.getElementsByClassName("lang-secondary");

  if (to_lang == primary) {
    for (var i = 0; i < btn_lang1.length; i++) {
      l1[i].style.display = "block";
      l2[i].style.display = "none";
      def[i].style.display = "none";
      if (page_lang != primary && page_lang != secondary) {
        btn_lang1[i].innerHTML = page_lang;
        btn_lang1[i].setAttribute("onclick", "switchlang('" + primary + "," + page_lang + "','" + c + "')");
        btn_lang2[i].innerHTML = secondary;
        btn_lang2[i].setAttribute("onclick", "switchlang('" + page_lang + "," + secondary + "','" + c + "')");
      }
    }
  } else if (to_lang == secondary) {
    for (var i = 0; i < btn_lang2.length; i++) {
      l1[i].style.display = "none";
      l2[i].style.display = "block";
      def[i].style.display = "none";
      if (page_lang != primary && page_lang != secondary) {
        btn_lang1[i].innerHTML = primary;
        btn_lang1[i].setAttribute("onclick", "switchlang('" + page_lang + "," + primary + "','" + c + "')");
        btn_lang2[i].innerHTML = page_lang;
        btn_lang2[i].setAttribute("onclick", "switchlang('" + secondary + "," + page_lang + "','" + c + "')");
      }
    }
  } else {
    for (var i = 0; i < btn_lang1.length; i++) {
      l1[i].style.display = "none";
      l2[i].style.display = "none";
      def[i].style.display = "block";
      if (page_lang != primary && page_lang != secondary) {
        btn_lang1[i].innerHTML = primary;
        btn_lang1[i].setAttribute("onclick", "switchlang('" + page_lang + "," + primary + "','" + c + "')");
        btn_lang2[i].innerHTML = secondary;
        btn_lang2[i].setAttribute("onclick", "switchlang('" + page_lang + "," + secondary + "','" + c + "')");
      }
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
