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
var normalTexture = new THREE.TextureLoader().load('./assets/m1_textures/test_Normal.png');
normalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

normalTexture.flipY = false;

var aoOcclusion = new THREE.TextureLoader().load('./assets/m1_textures/test_Occlusion.png');
aoOcclusion.anisotropy = renderer.capabilities.getMaxAnisotropy();
aoOcclusion.flipY = false;
var aoMetalness = new THREE.TextureLoader().load('./assets/m1_textures/test_Metalness.png');
aoMetalness.anisotropy = renderer.capabilities.getMaxAnisotropy();
aoMetalness.flipY = false;
var aoGloss = new THREE.TextureLoader().load('./assets/m1_textures/test_Gloss.png');
aoGloss.anisotropy = renderer.capabilities.getMaxAnisotropy();
aoGloss.flipY = false;
var map = new THREE.TextureLoader().load('./assets/m1_textures/test_Albedo.png');
map.anisotropy = renderer.capabilities.getMaxAnisotropy();

map.flipY = false;



// Models

let model1;
const loader = new THREE.GLTFLoader();
loader.load('./models/model1/scene.gltf', 
function (gltf) {
  model1 = gltf.scene.children[0];
  model1.material = new THREE.MeshStandardMaterial({
    //map: map,
    metalnessMap: aoMetalness,
    metalness: 1.0,
    normalMap: normalTexture,
    aoMap: aoOcclusion,
    aoMapIntensity: 0.1,
    roughnessMap: aoGloss,
    roughness: 0.09,
    emissive: 0xffffff,
    emissiveIntensity: 0.01,
    wireframe: true,
    
  });
  scene.add(model1);

},
  function (xhr) {
    let status = Math.round(xhr.loaded / xhr.total) * 100;
    let finished;

    console.log(status + '% loaded');
    console.log(status)
    
    if (status >= 100) {
      $(window).on("load", function(){
        $(".loader-wrapper").fadeOut(1200);
        }
      )};
  
  },





  // called when loading has errors
  function (error) {

    console.log(error);

  }
  
);



// Iluminação
/*const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(0,1,0);
dirLight.castShadow = true;
scene.add(dirLight);*/

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

const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg');
scene.background = new THREE.Color(0xdddddd);

// Animação

function animate() {
  requestAnimationFrame(animate);

  if(model1) model1.rotation.y += 0.005;
 // if(model2) model1.rotation.y += 0.005;
 // if(model3) model3.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);

}

animate()

document.body.appendChild(renderer.domElement);

window.addEventListener( 'resize', onWindowResize, false);

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight);
}

renderer.render(scene, camera);
