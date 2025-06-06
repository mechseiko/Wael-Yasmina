
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Import Images
import assasin from '../images/assasin.jpg';
import pex from '../images/pex.jpg';
import mech from '../images/mech.jpg'
import oppei from '../images/oppenheimer.jpg'
import ethix from '../images/ethix.jpg'


const renderer = new THREE.WebGLRenderer();
// Enable Shadows
renderer.shadowMap.enabled = true;
const height = window.innerHeight
const width = window.innerWidth
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    0.1,
    1000
)
const orbit = new OrbitControls(camera, renderer.domElement)


// AXES HELPER
const axesHelper = new THREE.AxesHelper(15);
// 15 represents the length of the axes
scene.add(axesHelper)


// ORBIT AND CAMERA                                                                                                 
// camera.position.z = 5;
// camera.position.y = 2
// camera.position.x = 2
camera.position.set(-30, 30, 30);
orbit.update()

 
// OBJECT -- BOX -- CUBE
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FF00
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.set(5, 1, 0)


// PLANE
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide,
    // wireframe: true,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;



// GRID HELPER
const gridHelper = new THREE.GridHelper(50)
// The new THREE.GridHelper() takes two arguments 30 Increases the surface of the grid
// the second argument divides the grid into smaller squares
scene.add(gridHelper)



// SPHERE
const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
// The three arguments are the size,width and height segments.
const sphereMaterial = new THREE.MeshStandardMaterial({
// const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFcf,
    // wireframe: true,
})
// MeshStandardMaterial return black materials, they are independent of colors.
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere);
sphere.position.set(-10, 10, 0); 
sphere.castShadow = true;
box.castShadow = true;


// LIGHTS
// The types of lights in Three.js are AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight, RectAreaLight, and LightProbe.
// The first argument is the color of the light, the second is the intensity
// AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


// // DirectionalLight
// const directionalLight = new THREE.DirectionalLight(0xffffff, .8);
// directionalLight.position.set(-30, 50, 0);
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(directionalLight);
// scene.add(dLightHelper);
// directionalLight.castShadow = true;
// let dLightShadowCamera = directionalLight.shadow.camera;
// const dLightShadowHelper = new THREE.CameraHelper(dLightShadowCamera);
// scene.add(dLightShadowHelper);
// dLightShadowCamera.bottom = -12;



// // SpotLight
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-100, 100, 0);
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight);
spotLight.castShadow = true;
spotLight.angle = 0.2;
scene.add(sLightHelper);



// FOG IN THREE.JS
// THERE ARE TWO METHODS OF RENDERING FOGS TO OUR THREE.JS SCENE
// METHIOD 1 
// scene.fog = new THREE.Fog(0xffffff, 0, 700)
// The arguments are fogColor, near & far limits of space where the fog is visible
// METHOD 2
// The arguments are fogColor & density
scene.fog = new THREE.FogExp2(0xffffff, .002)



// CHANGE DEFAULT THREE.JS BACKGROUND COLOR
renderer.setClearColor(0x741133)
// We use the texture loader class to create and instance of the textureloader which will be used to 
// render an image in our scene;
const textureLoader = new THREE.TextureLoader();
// textureLoader.load(mech, function(texture) {
//     scene.background = texture;
// });
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = new THREE.CubeTextureLoader([assasin, pex, mech, ethix, assasin, mech]);


const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    // map: textureLoader.load(mech),
});
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(assasin)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(oppei)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(pex)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(ethix)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(mech)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(assasin)}),
]
const box2 = new THREE.Mesh(box2Geometry, box2Material);
// const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);
box2.castShadow = true;
box2.name = "My Box2"
// box2.material.map = textureLoader.load(pex)



//  RAY CASTERS 
// Source & Destination are Camera & Mouse/Cursor
const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove', function(mouse) {
    mousePosition.x = (mouse.clientX / width) * 2 - 1;
    mousePosition.y = (mouse.clientY / height) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

// CHANGING THE SHAPE OF A MESH
const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10)
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true,
})
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
plane2.position.set(10, 10, 15)
scene.add(plane2);
// CHANGING POSITION OF POINTS - WEBGL GLSL- SHADERS
plane2.geometry.attributes.position.array[0] -= 10 * Math.random()
plane2.geometry.attributes.position.array[1] -= 10 * Math.random()
plane2.geometry.attributes.position.array[2] -= 10 * Math.random()
const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random()



// ADDING VERTEX AND FRAGMENT SHADERS IN THREE.JS
const sphere2Geometry = new THREE.SphereGeometry(4);
// const vShader = `
//     void main() {
//         gl_position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;
// const fShader = `
//     void main() {
//         gl_ FragColor = vec4(1.0, 0.5, 1.0, 1.0)
//     }
// `;
const sphere2Material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
})
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10)



//  THE dat.GUI() LIBRARY
const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: .01,
    angle: 0.1,
    prenumbra: 0,
    intensity: 1,
}
gui.addColor(options, 'sphereColor').onChange((color) => {
    sphere.material.color.set(color);
})
gui.add(options, 'wireframe').onChange(function(wireframe) {
    sphere.material.wireframe = wireframe;
    box.material.wireframe =  wireframe;
})
gui.add(options, 'speed', 0, .1);
gui.add(options, 'angle', 0, .15);
gui.add(options, 'prenumbra', 0, 1);
gui.add(options, 'intensity', 0, 2);
// Last two arguments are minimum and maximum speeds

let step = 0;
const sphereId = sphere.id
// ANIMATE
const animate = (time) => {
    // box.rotation.x +=.05;
    // box.rotation.y += .05;
    step += options.speed;
    sphere.position.y = 20 * Math.abs((Math.sin(step)));
    box.position.y = 20 * Math.abs(Math.sin(step));
    box2.position.y = 20 * Math.abs(Math.sin(step));
    // plane.rotation.z += .1

    spotLight.angle = options.angle;
    spotLight.prenumbra = options.prenumbra;
    spotLight.intensity = options.intensity;
    spotLight.decay = options.decay;
    sLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    // console.log(intersects);
    // console.log(sphere.id)

    for(let i = 0; i < intersects.length; i++){
        if(intersects[i].object.id === sphereId) {
            intersects[i].object.material.color.set(0xFF0000);
        }
        if(intersects[i].object.name === "My Box2") {
            intersects[i].object.rotation.x = time / 100;
            intersects[i].object.rotation.y = time / 100;
        }
    }

    plane2.geometry.attributes.position.array[0] = 10 * Math.random()
    plane2.geometry.attributes.position.array[1] = 10 * Math.random()
    plane2.geometry.attributes.position.array[2] = 10 * Math.random()
    plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
    plane2.geometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera);
}
// setAnimationLoop
renderer.setAnimationLoop(animate);
