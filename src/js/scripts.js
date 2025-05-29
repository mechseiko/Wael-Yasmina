

import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const renderer = new THREE.WebGLRenderer();
const height = window.innerHeight
const width = window.innerWidth
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
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
camera.position.set(40, 50, 40);
orbit.update()


// OBJECT -- BOX -- CUBE
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FF00
});10
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.set(5, -1, -30)


// PLANE
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide,
    // wireframe: true,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI
plane.rotation.set(-0.5 * Math.PI, 0, 0)


// GRID HELPER
const gridHelper = new THREE.GridHelper(95, 50)
// The new THREE.GridHelper() takes two arguments 30 Increases the surface of the grid
// the second argument divides the grid into smaller squares
scene.add(gridHelper)


// SPHERE
const sphereGeometry = new THREE.SphereGeometry(5, 10, 10);
// The three arguments are the size,width and height segments.
const sphereMaterial = new THREE.MeshBasicMaterial({
// const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x00FFcf,
    // wireframe: true,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere);
sphere.position.set(5, -5, 30)



//  THE GUI DATE LIBRARY
const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    // speed: .01,
    speed: .01,
}
gui.addColor(options, 'sphereColor').onChange((color) => {
    sphere.material.color.set(color);
    box.material.color.set(color);
})
gui.add(options, 'wireframe').onChange(function(wireframe) {
    sphere.material.wireframe = wireframe;
    box.material.wireframe = wireframe;
})
gui.add(options, 'speed', 0, .1);
// Last two arguments are minimum and maximum speeds

let step = 0;
// let speed = .1;
// ANIMATE
const animate = () => {
    // box.rotation.x = box.rotation.x + .05;
    // box.rotation.y += .05;
    step += options.speed;
    sphere.position.y = 100 * Math.abs(Math.sin(step));
    box.position.y = 100 * Math.abs(Math.sin(step));
    plane.rotation.z = 10 * Math.abs(Math.sin(step));
    gridHelper.rotation.y = -10 * Math.abs(Math.sin(step));
    // sphere.rotation.z += .05;
    // sphere.rotation.z += .05;
    // gridHelper.rotation.z += .05;
    renderer.render(scene, camera);
}
// setAnimationLoop
renderer.setAnimationLoop(animate);

// LIGHTS
// The types of lights in Three.js are AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight, RectAreaLight, and LightProbe.
const ambientLight = new THREE.AmbientLight(0xf55f, 5);
// The first argument is the color of the light, the second is the intensity
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// The first argument is the color of the light, the second is the intensity
directionalLight.position.set(10, 10, 10);
// The position of the light
scene.add(directionalLight);
// The light is added to the scene
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
// The first argument is the color of the light, the second is the intensity, and the third is the distance
pointLight.position.set(0, 10, 0);
// The position of the light
scene.add(pointLight);
// The light is added to the scene
const spotLight = new THREE.SpotLight(0xffffff, 1);
// The first argument is the color of the light, the second is the intensity
spotLight.position.set(0, 10, 0);
// The position of the light
spotLight.angle = Math.PI / 4;
// The angle of the light
spotLight.penumbra = 0.1;
// The penumbra of the light
spotLight.decay = 2;
// The decay of the light
spotLight.distance = 100;
// The distance of the light
scene.add(spotLight);



