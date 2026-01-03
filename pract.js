import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// orbitcontroll   allows  for the  camera to move 
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
// GLTFloader allow for import the .gltf file
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
// TWEEN  allow to create animation  in camera position
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';



let canvasform = document.getElementById('dCanvas');
let width = canvasform.offsetWidth;
let height = canvasform.offsetHeight;
// create a threeJs scene
let  scene = new THREE.Scene();
// create  camera
let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
// keep the 3d object
// let object; 
// OrbitContro;s allow to the camera  move
let controls;
// instaniate a loder for the  .gilf file 
let loader =  new GLTFLoader();
// load the file
// loader.load(
//     // './free_porsche_911_carrera_4s/scene.gltf',
//     './2021_lamborghini_countach_lpi_800-4/scene.gltf',
//      function(gltf){
//         // if file loadede add to scene
//         object = gltf.scene;
//         scene.add(object);
        
//      }
// )
//allow   background  transparent with  alpha = true
let renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(width, height);
// Add the renderer to DOM HTML
document.getElementById('dCanvas').appendChild(renderer.domElement); 
// set camera 
camera.position.set(5, 0 , 1); //x,y,z
// add light in 3d models
let ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight); 
let directionLight = new THREE.DirectionalLight(0xffffff,1);
directionLight.position.set(0,1,0);
scene.add(directionLight);
let light = new THREE.PointLight(0x4c4c4c,10);

light.position.set(0,300,500);
scene.add(light);

let light2 = new THREE.PointLight(0x4c4c4c,10);
light2.position.set(500,100,0);
scene.add(light2); 

let light3 = new THREE.PointLight(0x4c4c4c,10);
light3.position.set(0,100,- 500);
scene.add(light3);

let light4 = new THREE.PointLight(0x4c4c4c,10);
light4.position.set(-500,300,500); 
scene.add(light4); 

// add controlls to the camera 
controls = new OrbitControls(camera, renderer.domElement) ;

// dropdown of car


// render the  scene 
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    TWEEN.update();
}
animate();



// new code of color changing  from blackbox ai

// Function to change car color dynamically
function changeCarColor(hexColor) {
  if (!object) return; // model not loaded yet
  object.traverse((child) => {
    if (child.isMesh && child.material && 'color' in child.material) {
      child.material.color.set(hexColor);
      child.material.needsUpdate = true;
    }
  });
}

// Example: change color to red after loading
// loader.load(
//   './2021_lamborghini_countach_lpi_800-4/scene.gltf',
//   function(gltf){
//     object = gltf.scene;
//     scene.add(object);

//     // Set initial color (optional)
//     changeCarColor('#ff0000');
//   }
// );

// Add a color picker input to your HTML somewhere:
// <input type="color" id="colorPicker" value="#ff0000" />

// Then add this event listener in your JS to update color dynamically:
document.getElementById('colorPicker').addEventListener('input', (event) => {
  changeCarColor(event.target.value);
});


// ======================= Existing code =======================
// All your imports, scene setup, loader, renderer, camera, lights, controls
// Animation function animate()
// Color change function changeCarColor()
// Color picker event listener
// =============================================================

// ---------- Car Model Selection  this is aso working code----------
// const modelSelect = document.getElementById('modelSelect');
// const displayDiv = document.getElementById('selectedCarDisplay');

// // Map car models to GLTF paths
// let modelMap = {
//     'lamborghini': './2021_lamborghini_countach_lpi_800-4/scene.gltf',
//     'bmw i8': './bmw_i8/scene.gltf',
//     'ferrari': './ferrari/scene.gltf',
//     'bmw': './bmw_i8_xs_2015__www.vecarz.com/scene.gltf'
// };

// // Function to load a car model
// function loadCarModel(modelKey) {
//     if (!modelKey || !modelMap[modelKey]) return;

//     // Remove existing model
//     if (object) {
//         scene.remove(object);
//         object = null;
//     }

//     // Load the new model
//     loader.load(modelMap[modelKey], function(gltf) {
//         object = gltf.scene;
//         scene.add(object);

//         // Optional: set initial color
//         changeCarColor('#ffffff'); // default white
//     });

//     // Update display
//     displayDiv.innerHTML = `<p>Selected Car Model: <strong>${modelKey}</strong></p>`;
// }

// // Set default model on page load
// window.addEventListener('DOMContentLoaded', () => {
//     let defaultModel = 'lambo';
//     modelSelect.value = defaultModel;
//     loadCarModel(defaultModel);
// });

// // Change model dynamically when dropdown changes
// modelSelect.addEventListener('change', () => {
//     const selectedModel = modelSelect.value;
//     loadCarModel(selectedModel);
// });









// IMPORTANT: Declare `object` only ONCE in your whole file, at top with scene/camera/etc.
let object = null;  

const modelMap = {
  'lambo': './2021_lamborghini_countach_lpi_800-4/scene.gltf',
  'bmw i8': './bmw_i8/scene.gltf',
  'ferrari': './ferrari_laferrari__www.vecarz.com/scene.gltf',
  'bmw i8 xs': './bmw_i8_xs_2015__www.vecarz.com/scene.gltf'
};

let loadVersion = 0; // track loads to avoid overlaps

function disposeModel(root) {
  root.traverse((child) => {
    if (child.isMesh) {
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach(m => m && m.dispose && m.dispose());
      } else if (child.material) {
        child.material.dispose();
      }
    }
  });
}

function loadCarModel(modelKey, displayDiv) {
  if (!modelKey || !modelMap[modelKey]) return;

  // --- Remove old model before loading new ---
  if (object) {
    scene.remove(object);
    disposeModel(object);
    object = null;
  }

  const thisLoad = ++loadVersion;

  loader.load(
    modelMap[modelKey],
    (gltf) => {
      // prevent showing old/stale loads
      if (thisLoad !== loadVersion) return;

      object = gltf.scene;
      scene.add(object);

      // Optional default color
      if (typeof changeCarColor === 'function') {
        // changeCarColor('#ffffff');
      }
    },
    undefined,
    (err) => console.error('Model load failed:', err)
  );

  if (displayDiv) {
    displayDiv.innerHTML = `<p>Selected Car Model: <strong>${modelKey}</strong></p>`;
  }
}

function initModelSelect() {
  const modelSelect = document.getElementById('modelSelect');
  const displayDiv = document.getElementById('selectedCarDisplay');

  if (!modelSelect) {
    console.error('Dropdown #modelSelect not found');
    return;
  }

  const defaultModel = 'lambo';
  modelSelect.value = defaultModel;
  loadCarModel(defaultModel, displayDiv);

  modelSelect.addEventListener('change', () => {
    loadCarModel(modelSelect.value, displayDiv);
  });
}

// Init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModelSelect);
} else {
  initModelSelect();
}



//  wheels section 
// Keep track of loaded wheels
let wheels = {
  wheel1: null,
  wheel2: null,
  wheel3: null
};

// Predefine wheel positions (adjust these for your car model)
const wheelPositions = [
  // { x: 1, y: 0, z: 1 },   // Front Right
  // { x: -1, y: 0, z: 1 },  // Front Left
  // { x: 1, y: 0, z: -1 },  // Rear Right
  // { x: -1, y: 0, z: -1 }  // Rear Left
  { x: 1.5, y: 0.3, z: 2.2 }, // Front Right
  { x: -1.5, y: 0.3, z: 2.2 }, // Front Left
  { x: 1.5, y: 0.3, z: -2.2 }, // Rear Right
  { x: -1.5, y: 0.3, z: -2.2 }
];

const wheelSelect = document.getElementById('wheelSelect');
const addWheelBtn = document.getElementById('addWheelBtn');
const removeWheelBtn = document.getElementById('removeWheelBtn');

const wheelLoader = new GLTFLoader();

// Map wheel options to 3D model paths
const wheelMap = {
  wheel1: './free_wheels_-_rst-carbon_sdc/scene.gltf',
  wheel2: './wheels/wheel2.gltf',
  wheel3: './wheels/wheel3.gltf'
};

// Add wheels
addWheelBtn.addEventListener('click', () => {
  const selectedWheel = wheelSelect.value;
  if (!selectedWheel || !wheelMap[selectedWheel]) return;
  if (!object) return; // Car not loaded yet

  // Remove previous wheels first
  removeWheels();

  // Load the selected wheel model
  wheelLoader.load(wheelMap[selectedWheel], (gltf) => {
    for (let i = 0; i < 4; i++) {
      const wheel = gltf.scene.clone(); // clone 4 wheels
      wheel.position.set(
        wheelPositions[i].x,
        wheelPositions[i].y,
        wheelPositions[i].z
      );
      object.add(wheel); // attach wheel to car
      wheels[selectedWheel] = wheels[selectedWheel] || [];
      wheels[selectedWheel].push(wheel);
    }
  });
});

// Remove wheels
removeWheelBtn.addEventListener('click', () => {
  removeWheels();
});

function removeWheels() {
  for (const key in wheels) {
    if (wheels[key]) {
      wheels[key].forEach((wheel) => {
        if (object) object.remove(wheel);
      });
      wheels[key] = null;
    }
  }
}


// js for sound section

    // function playSound(id) {
    //     let sound = document.getElementById(id);
    //     sound.currentTime = 0;  
    //     sound.play();
    // }
    // function playSound(id) {
    // Pause all sounds first
    
function playSound(id) {
    // Stop all sounds first
    const allSounds = ['sport', 'turbo', 'electric', 'startup'];
    allSounds.forEach(soundId => {
        const audio = document.getElementById(soundId);
        audio.pause();
        audio.currentTime = 0;
    });

    // Play selected sound
    const audioToPlay = document.getElementById(id);
    if (audioToPlay) {
        audioToPlay.play();
    }
}
// make playSound accessible to HTML buttons
window.playSound = playSound;


