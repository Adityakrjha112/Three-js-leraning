// import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import imageSource from './static/textures/door/color.jpg'

// console.log(imageSource)


// texture

const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//     console.log('Loading started')
// }
// loadingManager.onLoad = () => {
//     console.log('Loading complete')
// }
// loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
//     console.log(`Loading progress: ${itemsLoaded} of ${itemsTotal} items loaded`)
// }
// loadingManager.onError = (url) => {
//     console.error(`Error loading ${url}`)
// }
const textureLoader = new THREE.TextureLoader(loadingManager)
// const texture = textureLoader.load(
//     './static/textures/door/color.jpg',
//     () => {
//         console.log('Texture loaded successfully')
//     },
//     () => {
//         console.log(`Texture loading progress`)
//     },
//     (error) => {
//         console.error('Error loading texture:', error)
//     }

// )
const texture = textureLoader.load('./static/textures/minecraft.png')
const texture1 = textureLoader.load('./static/textures/door/alpha.jpg')
const texture2 = textureLoader.load('./static/textures/door/ambientOcclusion.jpg')
const texture3 = textureLoader.load('./static/textures/door/height.jpg')
const texture4 = textureLoader.load('./static/textures/door/normal.jpg')
const texture5 = textureLoader.load('./static/textures/door/metalness.jpg')
const texture6 = textureLoader.load('./static/textures/door/roughness.jpg')

texture.colorSpace = THREE.SRGBColorSpace
texture1.colorSpace = THREE.SRGBColorSpace
texture2.colorSpace = THREE.SRGBColorSpace
texture3.colorSpace = THREE.SRGBColorSpace
texture4.colorSpace = THREE.SRGBColorSpace
texture5.colorSpace = THREE.SRGBColorSpace
texture6.colorSpace = THREE.SRGBColorSpace

// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
// texture.repeat.x = 2
// texture.repeat.y = 3

// texture.offset.x = 0.5
// texture.offset.y = 0.5

// texture.rotation = Math.PI / 4
// texture.center.x = 0.5
// texture.center.y = 0.5

texture.generateMipmaps = false
texture.minFilter = THREE.NearestFilter
texture.magFilter = THREE.NearestFilter




// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = () => {
//     texture.needsUpdate = true
//     console.log(texture)
// }
// image.src = './static/textures/door/color.jpg'


// cursuer

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

// Geometry
let geometry = new THREE.BoxGeometry(1, 1, 1)
// console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: texture })



// Mesh
const cube = new THREE.Mesh(geometry, material)

// cube.rotation.y = 3.14 / 2
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)
camera.position.z = 2
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

const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// renderer.render(scene, camera)




