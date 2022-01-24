//import './styles.css';
//import * as THREE from "./node_modules/three/build/three.module.js"
//import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
//import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);

// Renderização

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Texturas Cerebro
var normalTexture = new THREE.TextureLoader().load('./public/assets/test_Normal.png');
normalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

normalTexture.flipY = false;

var aoOcclusion = new THREE.TextureLoader().load('./public/assets/test_Occlusion.png');
aoOcclusion.anisotropy = renderer.capabilities.getMaxAnisotropy();
aoOcclusion.flipY = false;
var aoMetalness = new THREE.TextureLoader().load('./public/assets/test_Metalness.png');
aoMetalness.anisotropy = renderer.capabilities.getMaxAnisotropy();
aoMetalness.flipY = false;
var aoGloss = new THREE.TextureLoader().load('./public/assets/test_Gloss.png');
aoGloss.anisotropy = renderer.capabilities.getMaxAnisotropy();
aoGloss.flipY = false;
var map = new THREE.TextureLoader().load('./public/assets/test_Albedo.png');
map.anisotropy = renderer.capabilities.getMaxAnisotropy();

map.flipY = false;



// Cerebro

var brain;
const loader = new THREE.GLTFLoader();
loader.load('./public/models/scene.gltf', 
function (gltf) {
  brain = gltf.scene.children[0];
  brain.material = new THREE.MeshStandardMaterial({
    map: map,
    metalnessMap: aoMetalness,
    metalness: 1.0,
    normalMap: normalTexture,
    aoMap: aoOcclusion,
    aoMapIntensity: 0.1,
    roughnessMap: aoGloss,
    roughness: 0,
    emissive: 0xffffff,
    emissiveIntensity: 0.01,
    
  });
  scene.add(brain);

},
  function (xhr) {

    console.log((xhr.loaded / xhr.total * 100) + '% loaded');

  },





  // called when loading has errors
  function (error) {

    console.log('An error happened');

  }
  
);

// Iluminação

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(110,10,10)

const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(-110,10,10)

const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(0,110,10)

const hLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);

const aLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, pointLight2, pointLight3)

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper)

// Camera

camera.position.set(100, 10, 10);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Background

const spaceTexture = new THREE.TextureLoader().load('./public/assets/space.jpg');
scene.background = spaceTexture;

// Animação

function animate() {
  requestAnimationFrame(animate);

  //brain.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);

}

animate()



renderer.render(scene, camera);
