// import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

// Debug
const gui = new GUI({
    width: 400,
    title: 'Debug Panel',
    closeButton: true,
})

gui.hide()

window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        gui.hide()
    } else if (event.key === 's') {
        gui.show()
    }
})

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
const material = new THREE.MeshBasicMaterial({ color: "#fcba03" })

const cubeTweaks = gui.addFolder('Cube Tweaks')

// cubeTweaks.close()
// cubeTweaks.open()

const debugObject = {
    color: '#fcba03',
    spin: () => {
        gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + 10 })
    },
    widthsegments: 1,
    heightsegments: 1,
    subdivisions: 1,
    width: 1,
    height: 1,
    depth: 1
}

cubeTweaks.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color)
})
cubeTweaks.add(debugObject, 'spin')

cubeTweaks.add(debugObject, 'widthsegments').min(1).max(20).step(1).onFinishChange(() => {
    geometry.dispose()
    geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.widthsegments, debugObject.heightsegments)
    cube.geometry = geometry
})
cubeTweaks.add(debugObject, 'heightsegments').min(1).max(20).step(1).onFinishChange(() => {
    geometry.dispose()
    geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.widthsegments, debugObject.heightsegments)
    cube.geometry = geometry
})

cubeTweaks.add(debugObject, 'subdivisions').min(1).max(5).step(1).onFinishChange(() => {
    geometry.dispose()
    geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.widthsegments * debugObject.subdivisions, debugObject.heightsegments * debugObject.subdivisions)
    cube.geometry = geometry
})

cubeTweaks.add(debugObject, 'width').min(0.1).max(5).step(0.1).onFinishChange(() => {
    geometry.dispose()
    geometry = new THREE.BoxGeometry(debugObject.width, debugObject.height, debugObject.depth, debugObject.widthsegments * debugObject.subdivisions, debugObject.heightsegments * debugObject.subdivisions)
    cube.geometry = geometry
})
cubeTweaks.add(debugObject, 'height').min(0.1).max(5).step(0.1).onFinishChange(() => {
    geometry.dispose()
    geometry = new THREE.BoxGeometry(debugObject.width, debugObject.height, debugObject.depth, debugObject.widthsegments * debugObject.subdivisions, debugObject.heightsegments * debugObject.subdivisions)
    cube.geometry = geometry
})
cubeTweaks.add(debugObject, 'depth').min(0.1).max(5).step(0.1).onFinishChange(() => {
    geometry.dispose()
    geometry = new THREE.BoxGeometry(debugObject.width, debugObject.height, debugObject.depth, debugObject.widthsegments * debugObject.subdivisions, debugObject.heightsegments * debugObject.subdivisions)
    cube.geometry = geometry
})

// Debug
cubeTweaks.add(material, 'wireframe')
cubeTweaks.add(material, 'transparent')
cubeTweaks.add(material, 'opacity').min(0).max(1).step(0.01)
cubeTweaks.add(material, 'visible')

// Mesh
const cube = new THREE.Mesh(geometry, material)

// cube.rotation.y = 3.14 / 2
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)
camera.position.z = 5
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




