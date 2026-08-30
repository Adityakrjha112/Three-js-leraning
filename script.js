import gsap from 'gsap'
import * as THREE from 'three'

//canvas
const canvas = document.querySelector('canvas.webgl')

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
camera.position.x = 0
camera.position.y = 0
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('webgl')})
renderer.setSize(sizes.width, sizes.height)

gsap.to(cube.position, { duration: 1, delay: 1, x: 2 })
gsap.from(cube.position, { duration: 1, delay: 2, x: 0 })



// Animation loop
function animate() {
    
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()