import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'



// texturing - using textures to color our objects
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/statics/textures/matcaps/1.png')
const colorTexture2 = textureLoader.load('/statics/textures/matcaps/2.png')
const colorTexture3 = textureLoader.load('/statics/textures/matcaps/3.png')
const colorTexture4 = textureLoader.load('/statics/textures/matcaps/4.png')
const colorTexture5 = textureLoader.load('/statics/textures/matcaps/5.png')
const colorTexture6 = textureLoader.load('/statics/textures/matcaps/6.png')
const colorTexture7 = textureLoader.load('/statics/textures/matcaps/7.png')
const colorTexture8 = textureLoader.load('/statics/textures/matcaps/8.png')
colorTexture.colorSpace = THREE.SRGBColorSpace
colorTexture2.colorSpace = THREE.SRGBColorSpace
colorTexture3.colorSpace = THREE.SRGBColorSpace
colorTexture4.colorSpace = THREE.SRGBColorSpace
colorTexture5.colorSpace = THREE.SRGBColorSpace
colorTexture6.colorSpace = THREE.SRGBColorSpace
colorTexture7.colorSpace = THREE.SRGBColorSpace
colorTexture8.colorSpace = THREE.SRGBColorSpace
// console.log(colorTexture)


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




// Fonts & 3D Text
const fontLoader = new FontLoader()

fontLoader.load('static/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('SUGER', {
        font: font,
        size: 1,
        depth: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 4,
    })

    // Center the geometry
    textGeometry.center()

    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: colorTexture })
    const text = new THREE.Mesh(textGeometry, textMaterial)


    console.time('dounts')
    const dountGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32)
    const dountMaterial = new THREE.MeshMatcapMaterial({ matcap: colorTexture8 })

    for (let index = 0; index < 100; index++) {

        const dount = new THREE.Mesh(dountGeometry, dountMaterial)
        dount.position.x = (Math.random() - 0.5) * 10
        dount.position.y = (Math.random() - 0.5) * 10
        dount.position.z = (Math.random() - 0.5) * 10

        dount.rotation.x = (Math.random() - 0.5) * Math.PI
        dount.rotation.y = (Math.random() - 0.5) * Math.PI

        const scale = Math.random()
        dount.scale.set(scale, scale, scale)

        scene.add(dount)
    }
    console.timeEnd('dounts')

    scene.add(text)
})

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 7
camera.position.x = 0
camera.position.y = 0
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const Clock = new THREE.Clock()

const tick = () => {
    // Update controls
    controls.update()

    const elapsedTime = Clock.getElapsedTime()

    // Update mesh rotations
    // cube.rotation.x = elapsedTime * 0.1
    // cube.rotation.y = elapsedTime * 0.1

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// renderer.render(scene, camera)




