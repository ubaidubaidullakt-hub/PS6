const fileInput = document.getElementById("file");
const fpsBox = document.getElementById("fps");
let fps = 0;

function bootPS(){
  document.getElementById("startup").style.display="none";
}

function pickGame(){ fileInput.click(); }

function openSettings(){ settings.style.display="block"; }
function closeSettings(){ settings.style.display="none"; }

fileInput.onchange = e=>{
  const f = e.target.files[0];
  if(!f) return;
  startGame(f);
};

function detectCore(ext){
  return {
    nes:"nes", snes:"snes",
    gb:"gb", gbc:"gbc", gba:"gba",
    sms:"sms", gg:"sms",
    gen:"genesis", md:"genesis",
    psx:"psx", iso:"psx",
    psp:"psp",
    zip:"mame2003",
    exe:"dos",
    adf:"amiga",
    z80:"zxspectrum",
    col:"coleco",
    a26:"atari2600"
  }[ext] || "gba";
}

function startGame(file){
  home.style.display="none";
  emulator.style.display="block";

  const ext = file.name.split(".").pop().toLowerCase();

  window.EJS_player = "#player";
  window.EJS_gameUrl = URL.createObjectURL(file);
  window.EJS_core = detectCore(ext);
  window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
  window.EJS_startOnLoaded = true;
  window.EJS_Buttons = true;
  window.EJS_fps = true;

  const s = document.createElement("script");
  s.src="https://cdn.emulatorjs.org/stable/data/loader.js";
  document.body.appendChild(s);
}

/* Touch → Keyboard */
document.querySelectorAll("[data-k]").forEach(b=>{
  b.ontouchstart=e=>{
    e.preventDefault();
    navigator.vibrate?.(30);
    document.dispatchEvent(new KeyboardEvent("keydown",{key:b.dataset.k}));
  };
  b.ontouchend=e=>{
    e.preventDefault();
    document.dispatchEvent(new KeyboardEvent("keyup",{key:b.dataset.k}));
  };
});

/* FPS Meter */
setInterval(()=>{
  fpsBox.textContent="FPS: "+(fps++%60);
},1000);