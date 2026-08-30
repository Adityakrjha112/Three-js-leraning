// import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'


// Debug
const gui = new GUI({
    width: 400,
    title: 'Debug Panel',
})




const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
    // console.log(cursor)
})

//canvas
const canvas = document.querySelector('#webgl')

// Sizes
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

// fullscreen
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

// Scene
const scene = new THREE.Scene()

// texture loader
const textureLoader = new THREE.TextureLoader()
const doorTexture = textureLoader.load('Mstatic/textures/door/color.jpg')
const doorBumpMap = textureLoader.load('Mstatic/textures/door/roughness.jpg')
const doorNormalMap = textureLoader.load('Mstatic/textures/door/normal.jpg')
const doorAlphaMap = textureLoader.load('Mstatic/textures/door/alpha.jpg')
const doorAmbientOcclusionMap = textureLoader.load('Mstatic/textures/door/ambientOcclusion.jpg')
const doorHeightMap = textureLoader.load('Mstatic/textures/door/height.jpg')
const metalnessMap = textureLoader.load('Mstatic/textures/door/metalness.jpg')
const matcapTexture = textureLoader.load('Mstatic/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('Mstatic/textures/gradients/3.jpg')

doorTexture.colorSpace = THREE.SRGBColorSpace
doorBumpMap.colorSpace = THREE.SRGBColorSpace
doorNormalMap.colorSpace = THREE.SRGBColorSpace
doorAlphaMap.colorSpace = THREE.SRGBColorSpace
doorAmbientOcclusionMap.colorSpace = THREE.SRGBColorSpace
doorHeightMap.colorSpace = THREE.SRGBColorSpace
metalnessMap.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
gradientTexture.colorSpace = THREE.SRGBColorSpace

// Geometry
let geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry1 = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 );
const geometry2 = new THREE.CircleGeometry( 2, 32 );

// MeshBasicMaterial
// // let doubleSidedMaterial = new THREE.MeshBasicMaterial({ map: doorTexture, side: THREE.DoubleSide })
// let doubleSidedMaterial = new THREE.MeshBasicMaterial()
// doubleSidedMaterial.map = doorTexture
// doubleSidedMaterial.side = THREE.DoubleSide
// // doubleSidedMaterial.color = new THREE.Color("#ba1c1c")
// doubleSidedMaterial.transparent = true
// // doubleSidedMaterial.alphaMap = doorAlphaMap
// // doubleSidedMaterial.opacity = 0.5
// // doubleSidedMaterial.wireframe = true

// let singleSidedMaterial = new THREE.MeshBasicMaterial()
// singleSidedMaterial.map = doorTexture
// singleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial1 = new THREE.MeshBasicMaterial()
// singleSidedMaterial1.map = doorTexture
// singleSidedMaterial1.side = THREE.DoubleSide
// console.log(geometry.attributes.uv)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// MeshNormalMaterial
// let doubleSidedMaterial = new THREE.MeshNormalMaterial()
// doubleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial = new THREE.MeshNormalMaterial()
// singleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial1 = new THREE.MeshNormalMaterial()
// singleSidedMaterial1.side = THREE.DoubleSide

// MeshMatcapMaterial
// let doubleSidedMaterial = new THREE.MeshMatcapMaterial()
// doubleSidedMaterial.matcap = gradientTexture
// doubleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial = new THREE.MeshMatcapMaterial()
// singleSidedMaterial.matcap = matcapTexture
// singleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial1 = new THREE.MeshMatcapMaterial()
// singleSidedMaterial1.matcap = matcapTexture
// singleSidedMaterial1.side = THREE.DoubleSide

// MeshDepthMaterial
// let doubleSidedMaterial = new THREE.MeshDepthMaterial()
// doubleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial = new THREE.MeshDepthMaterial()
// singleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial1 = new THREE.MeshDepthMaterial()
// singleSidedMaterial1.side = THREE.DoubleSide



// MeshLambertMaterial
// let doubleSidedMaterial = new THREE.MeshLambertMaterial()
// doubleSidedMaterial.map = doorTexture
// doubleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial = new THREE.MeshLambertMaterial()
// singleSidedMaterial.map = doorTexture
// singleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial1 = new THREE.MeshLambertMaterial()
// singleSidedMaterial1.map = doorTexture
// singleSidedMaterial1.side = THREE.DoubleSide

// light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
// directionalLight.position.set(2, 2, 2)
// scene.add(directionalLight)

// Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('Mstatic/textures/environmentMap/2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
})

// MeshPhongMaterial
// let doubleSidedMaterial = new THREE.MeshPhongMaterial()
// doubleSidedMaterial.map = doorTexture
// doubleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial = new THREE.MeshPhongMaterial()
// singleSidedMaterial.map = doorTexture
// singleSidedMaterial.side = THREE.DoubleSide

// let singleSidedMaterial1 = new THREE.MeshPhongMaterial()
// singleSidedMaterial1.map = doorTexture
// singleSidedMaterial1.side = THREE.DoubleSide


// MeshStandardMaterial
// let doubleSidedMaterial = new THREE.MeshStandardMaterial()
// doubleSidedMaterial.roughness = 1
// doubleSidedMaterial.metalness = 1
// doubleSidedMaterial.side = THREE.DoubleSide
// doubleSidedMaterial.map = doorTexture
// doubleSidedMaterial.aoMap = doorAmbientOcclusionMap
// doubleSidedMaterial.aoMapIntensity = 1
// doubleSidedMaterial.displacementMap = doorHeightMap
// doubleSidedMaterial.displacementScale = 0.10
// doubleSidedMaterial.metalnessMap = metalnessMap
// doubleSidedMaterial.normalMap = doorNormalMap
// doubleSidedMaterial.roughnessMap = doorBumpMap

// let singleSidedMaterial = new THREE.MeshStandardMaterial()
// singleSidedMaterial.roughness = 0.7
// singleSidedMaterial.metalness = 0.2

// let singleSidedMaterial1 = new THREE.MeshStandardMaterial()
// singleSidedMaterial1.roughness = 0.7
// singleSidedMaterial1.metalness = 0.2

// meshPhysicalMaterial
let doubleSidedMaterial = new THREE.MeshPhysicalMaterial()
doubleSidedMaterial.roughness = 0
doubleSidedMaterial.metalness = 0
// doubleSidedMaterial.side = THREE.DoubleSide
// doubleSidedMaterial.map = doorTexture
// doubleSidedMaterial.aoMap = doorAmbientOcclusionMap
// doubleSidedMaterial.aoMapIntensity = 1
// doubleSidedMaterial.displacementMap = doorHeightMap
// doubleSidedMaterial.displacementScale = 0.10
// doubleSidedMaterial.metalnessMap = metalnessMap
// doubleSidedMaterial.normalMap = doorNormalMap
// doubleSidedMaterial.roughnessMap = doorBumpMap

// clearcoat and clearcoatRoughness are used to simulate a clear coating on top of the material, which can give it a glossy appearance. The clearcoat property controls the intensity of the clear coat, while clearcoatRoughness controls how rough or smooth the clear coat is. A lower value for clearcoatRoughness will result in a smoother, more reflective surface, while a higher value will make it appear more matte.
// doubleSidedMaterial.clearcoat = 1
// doubleSidedMaterial.clearcoatRoughness = 0.1

//sheen 
// doubleSidedMaterial.sheen = new THREE.Color(0xff0000)
// doubleSidedMaterial.sheenRoughness = 0.5

// Iridescence
// doubleSidedMaterial.iridescence = 1
// doubleSidedMaterial.iridescenceIOR = 1
// doubleSidedMaterial.iridescenceThicknessRange = [100, 800]

// transmission 
doubleSidedMaterial.transmission = 1
doubleSidedMaterial.ior = 1
doubleSidedMaterial.thickness = 0.5

let singleSidedMaterial = new THREE.MeshPhysicalMaterial()
singleSidedMaterial.roughness = 0.7
singleSidedMaterial.metalness = 0.2

let singleSidedMaterial1 = new THREE.MeshPhysicalMaterial()
singleSidedMaterial1.roughness = 0.7
singleSidedMaterial1.metalness = 0.2

gui.add(doubleSidedMaterial, 'roughness').min(0).max(1).step(0.0001)
gui.add(doubleSidedMaterial, 'metalness').min(0).max(1).step(0.0001)
gui.add(singleSidedMaterial, 'roughness').min(0).max(1).step(0.0001)
gui.add(singleSidedMaterial, 'metalness').min(0).max(1).step(0.0001)
gui.add(singleSidedMaterial1, 'roughness').min(0).max(1).step(0.0001)
gui.add(singleSidedMaterial1, 'metalness').min(0).max(1).step(0.0001)



// Mesh
const cube = new THREE.Mesh(geometry, doubleSidedMaterial)
const capsule = new THREE.Mesh(geometry1, singleSidedMaterial)
const circle = new THREE.Mesh(geometry2, singleSidedMaterial1)

cube.position.x = -4.5
capsule.position.x = 0
circle.position.x = 6

capsule.scale.set(0.9, 0.9, 0.9)

// cube.rotation.y = 3.14 / 2
scene.add(cube)
scene.add(capsule)
scene.add(circle)

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)
camera.position.z = 7
camera.position.x = 0
camera.position.y = 0


scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enabled = false
controls.enableDamping = true
controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)

const Clock = new THREE.Clock()

const tick = () => {
    // Update controls
    controls.update()

    const elapsedTime = Clock.getElapsedTime()

    // Update mesh rotations
    cube.rotation.x = elapsedTime * 0.1
    cube.rotation.y = elapsedTime * 0.1

    capsule.rotation.x = elapsedTime * 0.1
    capsule.rotation.y = elapsedTime * 0.1

    circle.rotation.x = elapsedTime * 0.1
    circle.rotation.y = elapsedTime * 0.1
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// renderer.render(scene, camera)




