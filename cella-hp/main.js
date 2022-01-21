import './style.css';
import * as THREE from 'three';
import { PointLightHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
var brain;
const loader = new GLTFLoader();
loader.load('scene.gltf', function( gltf ){
  brain = gltf.scene;
  scene.add( gltf.scene );
},
function ( xhr ) {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

  console.log( 'An error happened' );

}
);


/* const geometry = new THREE.TorusKnotGeometry(11, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const knot = new THREE.Mesh(geometry, material);

scene.add(knot) */

const pointLight = new THREE.PointLight(0xffffff);

const ambientLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);

scene.add(ambientLight, pointLight)

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper)

camera.position.set(0,0,10);

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;



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
