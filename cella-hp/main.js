import './style.css'
import * as THREE from 'three';
import { PointLightHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);



const geometry = new THREE.TorusKnotGeometry (11 , 3 , 16 , 100);
const material = new THREE.MeshStandardMaterial ( { color: 0xFF6347 });
const knot = new THREE.Mesh ( geometry, material );

scene.add(knot)


const pointLight = new THREE.PointLight (0xffffff);
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight (0xffffff);

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add (lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;
function animate() {  
  requestAnimationFrame( animate );

  knot.rotation.x += 0.01;
  knot.rotation.y += 0.005;
  knot.rotation.z += 0.02;

controls.update();

  renderer.render (scene , camera );

}

animate()



