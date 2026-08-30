import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// texture 
const textureLoader = new THREE.TextureLoader()
const bakedShadowTexture = textureLoader.load('./textures/bakedShadow.jpg')
const simpleShadowTexture = textureLoader.load('./textures/simpleShadow.jpg')
bakedShadowTexture.colorSpace = THREE.SRGBColorSpace
simpleShadowTexture.colorSpace = THREE.SRGBColorSpace

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 5
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
// directionalLight.shadow.radius = 10


scene.add(directionalLight)

// const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// directionalLightHelper.visible = false
// scene.add(directionalLightHelper)


// // spot light
// const spotLight = new THREE.SpotLight(0xffffff, 20, 10, Math.PI * 0.3)
// spotLight.position.set(0, 2, 3)
// spotLight.castShadow = true

// spotLight.shadow.mapSize.width = 1024
// spotLight.shadow.mapSize.height = 1024

// spotLight.shadow.camera.near = 1
// spotLight.shadow.camera.far = 5
// spotLight.shadow.camera.top = 2
// spotLight.shadow.camera.bottom = -2
// spotLight.shadow.camera.left = -2
// spotLight.shadow.camera.right = 2

// scene.add(spotLight)
// scene.add(spotLight.target)


// // camera light helper
// const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// spotLightCameraHelper.visible = false
// scene.add(spotLightCameraHelper)


// point light 
// const pointLight = new THREE.PointLight(0xffffff, 2, 10, 0)
// pointLight.position.set(-2, 1, -2)
// pointLight.castShadow = true

// pointLight.shadow.mapSize.width = 1024
// pointLight.shadow.mapSize.height = 1024

// pointLight.shadow.camera.near = 1
// pointLight.shadow.camera.far = 10

// scene.add(pointLight)

// // camera light helper
// const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
// pointLightCameraHelper.visible = true
// scene.add(pointLightCameraHelper)




/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()

material.roughness = 0.7



gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)

// sphere.castShadow = true
// sphere.material.map = bakedShadowTexture


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, alphaMap: simpleShadowTexture })
)
sphereShadow.position.y = -0.490
sphereShadow.position.x = 0
sphereShadow.position.z = 0
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.material.transparent = true
sphereShadow.material.opacity = 2
gui.add(sphereShadow.material, 'opacity').min(0).max(1).step(0.001)
gui.add(sphereShadow.position, 'x').min(-5).max(5).step(0.001)
gui.add(sphereShadow.position, 'y').min(-5).max(5).step(0.001)
gui.add(sphereShadow.position, 'z').min(-5).max(5).step(0.001)

// plane.receiveShadow = true
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5




scene.add(sphere, plane, sphereShadow)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update sphere
    sphere.position.x = Math.sin(elapsedTime * 0.5) * 2
    sphere.position.z = Math.cos(elapsedTime * 0.5) * 2
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3)) * 2

    // update sphere shadow
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    sphereShadow.position.y = sphere.position.y - 0.490

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()