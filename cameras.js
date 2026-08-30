// import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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

// Scene
const scene = new THREE.Scene()

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "#fcba03" })

// Mesh
const cube = new THREE.Mesh(geometry, material)

// cube.rotation.y = 3.14 / 2
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)
camera.position.z = 5
// camera.position.x = 0
// camera.position.y = 0


scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)

// gsap.from(cube.rotation, { duration: 1, delay: 2, x: 0 })


// Animate
const tick = () => {
    // camera x, y position
    // camera.position.x = -(cursor.x * 5)
    // camera.position.y = -(cursor.y * 5)
    // camera.lookAt(cube.position)

    // camera rotation
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5
    // camera.position.y = cursor.y * 5
    // camera.lookAt(cube.position)

    // update controls (needed because of enableDamping)
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()



