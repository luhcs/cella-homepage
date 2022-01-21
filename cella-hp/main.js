import './style.css';
import * as THREE from 'three';
import { PointLightHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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
var normalTexture = new THREE.TextureLoader().load('./assets/test_Normal.png');

var aoOcclusion = new THREE.TextureLoader().load('./assets/test_Occlusion.png');

var aoMetalness = new THREE.TextureLoader().load('./assets/test_Metalness.png');

var aoGloss = new THREE.TextureLoader().load('./assets/test_Gloss.png')

var map = new THREE.TextureLoader().load('./assets/test_Albedo.png');

map.encoding = THREE.sRGBEncoding;

map.flipY = false;


// Cerebro

var brain;
const loader = new GLTFLoader();
loader.load('scene.gltf', function( gltf ){
  brain = gltf.scene.children[0];
  brain.material = new THREE.MeshMatcapMaterial({
    map: map,
    normalMap: normalTexture,
    normalMap: aoOcclusion,
    

  });
  scene.add( brain );

},
function ( xhr ) {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},





// called when loading has errors
function ( error ) {

  console.log( 'An error happened' );

}
);

// Iluminação

const pointLight = new THREE.PointLight(0xffffff);

const hLight = new THREE.HemisphereLight(0xffffff, 0x000000, 10);

scene.add(hLight)

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper)

// Camera

camera.position.set(100,10,10);

const controls = new OrbitControls(camera, renderer.domElement);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Animação

function animate() {
  requestAnimationFrame(animate);

  brain.rotation.x += 0;
  brain.rotation.y += 0.005;
  brain.rotation.z += 0;

  controls.update();

  renderer.render(scene, camera);

}

animate()



renderer.render(scene, camera);
