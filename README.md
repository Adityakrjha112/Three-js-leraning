# 🌐 Three.js Complete Learning Handbook & Notes

A comprehensive, progressive, and hands-on Three.js handbook and study repository. This single guide contains complete lesson notes, working code examples, API references, common mistakes, and practice challenges from beginner to advanced topics.

---

## 📑 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🔄 How to Switch Between Lessons](#-how-to-switch-between-lessons)
- [🛠️ Tech Stack & Tools](#️-tech-stack--tools)
- [📂 Project Structure](#-project-structure)
- [📚 Complete Lessons](#-complete-lessons)
  - [Lesson 01: Basic Scene, Camera, Renderer & Animation Loop](#lesson-01-basic-scene-camera-renderer--animation-loop)
  - [Lesson 02: Cameras & OrbitControls](#lesson-02-cameras--orbitcontrols)
  - [Lesson 03: Fullscreen & Viewport Resizing](#lesson-03-fullscreen--viewport-resizing)
  - [Lesson 04: Geometries & BufferGeometry](#lesson-04-geometries--buffergeometry)
  - [Lesson 05: Debug UI with lil-gui](#lesson-05-debug-ui-with-lil-gui)
  - [Lesson 06: Textures & LoadingManager](#lesson-06-textures--loadingmanager)
  - [Lesson 07: Materials & Environment Maps](#lesson-07-materials--environment-maps)
  - [Lesson 08: 3D Text & Object Scattering](#lesson-08-3d-text--object-scattering)
  - [Lesson 09: Lights & Helpers](#lesson-09-lights--helpers)
  - [Lesson 10: Shadows & Shadow Maps](#lesson-10-shadows--shadow-maps)
- [🗺️ Upcoming Roadmap](#️-upcoming-roadmap)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- `npm` or `yarn`

### 2. Installation
Install project dependencies:
```bash
npm install
```

### 3. Running the Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🔄 How to Switch Between Lessons

Each lesson has its own dedicated JavaScript file in the root directory. To switch between active lessons, simply change the script import inside [`index.html`](./index.html):

```html
<!-- Example: To view Lesson 08 (3D Text) -->
<script type="module" src="./text.js"></script>

<!-- To switch to Lesson 07 (Materials) -->
<!-- <script type="module" src="./materials.js"></script> -->

<!-- To switch to Lesson 05 (Debug UI) -->
<!-- <script type="module" src="./debug.js"></script> -->
```

---

## 🛠️ Tech Stack & Tools

- **Core 3D Engine:** [Three.js](https://threejs.org/) (`^0.185.1`)
- **Development Server:** [Vite](https://vitejs.dev/) (`^8.2.2`)
- **Debugging & Tweaking:** [lil-gui](https://lil-gui.georgealways.com/) (`^0.21.0`)
- **Animation Library:** [GSAP](https://greensock.com/gsap/) (`^3.5.1`)

---

## 📂 Project Structure

```text
├── index.html        # Main HTML canvas entry point
├── style.css         # Reset and full-viewport canvas styling
├── package.json      # Dependencies and scripts
├── README.md         # Complete learning handbook (All notes in one place)
│
├── script.js         # Lesson 01: Basics & GSAP
├── cameras.js        # Lesson 02: Cameras & OrbitControls
├── fullScreen.js     # Lesson 03: Resize & Fullscreen
├── geometries.js     # Lesson 04: BufferGeometry & Vertices
├── debug.js          # Lesson 05: Debug UI (lil-gui)
├── textures.js       # Lesson 06: Textures & LoadingManager
├── materials.js      # Lesson 07: Materials & HDR Maps
├── text.js           # Lesson 08: 3D Text & Geometry Scattering
├── light.js          # Lesson 09: Lights & Helpers
├── shadows.js        # Lesson 10: Shadow Maps & Baked Shadows
│
└── static/           # Textures, HDR environments, and fonts
```

---

## 📚 Complete Lessons

---

### Lesson 01: Basic Scene, Camera, Renderer & Animation Loop
*Source File: [`script.js`](./script.js)*

#### What You'll Learn
- The 4 fundamental building blocks of Three.js: **Scene**, **Camera**, **Mesh (Geometry + Material)**, and **Renderer**.
- How 3D coordinate space works (`X`, `Y`, `Z`).
- How to create a continuous 60 FPS animation loop using `requestAnimationFrame`.
- How to animate object transformations smoothly with GSAP.

#### Concept
To display anything in 3D in the browser, Three.js requires 4 core pillars:
1. **Scene (`THREE.Scene`)**: A virtual 3D container (like a movie set) that holds all your objects, lights, and cameras.
2. **Mesh (`THREE.Mesh`)**: The visible 3D object composed of:
   - **Geometry**: The mathematical shape/skeleton (Box, Sphere, Plane).
   - **Material**: The skin/surface appearance (Color, Texture, Roughness).
3. **Camera (`THREE.PerspectiveCamera`)**: The viewpoint through which the 3D scene is viewed.
4. **Renderer (`THREE.WebGLRenderer`)**: The engine that renders the Scene and Camera onto the HTML `<canvas>` element.

```
[ Geometry + Material ] ──> [ Mesh ] ──> [ Scene ] 
                                            │
               [ Camera ] ──────────────────┤
                                            ▼
                                   [ WebGLRenderer ] ──> <canvas>
```

#### Example
```javascript
import * as THREE from 'three'
import gsap from 'gsap'

// 1. Canvas & Sizes
const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }

// 2. Scene
const scene = new THREE.Scene()

// 3. Object = Geometry + Material
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#fcba03' })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 4. Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
scene.add(camera)

// 5. Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

// 6. GSAP Animation
gsap.to(cube.position, { duration: 1, delay: 1, x: 2 })
gsap.to(cube.position, { duration: 1, delay: 2, x: 0 })

// 7. Animation Loop
function animate() {
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()
```

#### Code Explanation
1. `new THREE.Scene()`: Creates the 3D world graph.
2. `new THREE.BoxGeometry(1, 1, 1)`: Creates a cube with width=1, height=1, depth=1.
3. `new THREE.MeshBasicMaterial({ color: '#fcba03' })`: Creates a flat unlit colored material.
4. `camera.position.z = 3`: Pulls the camera backward so the cube is in front of the lens.
5. `renderer.render(scene, camera)`: Performs the WebGL draw call.
6. `requestAnimationFrame(animate)`: Recursively invokes `animate()` before the next browser repaint at 60 FPS.

#### Key APIs
- `new THREE.Scene()` — Scene graph container.
- `new THREE.PerspectiveCamera(fov, aspect, near, far)` — Perspective camera.
- `new THREE.BoxGeometry(w, h, d)` — Box geometry.
- `new THREE.MeshBasicMaterial({ color })` — Unlit material.
- `new THREE.Mesh(geometry, material)` — Combines geometry and material.
- `renderer.render(scene, camera)` — Renders frame.

#### Common Mistakes
- **Black Screen**: Forgetting `camera.position.z = 3`. The camera and cube both start at `(0,0,0)`, placing the camera inside the object.
- **Missing Object**: Forgetting `scene.add(cube)`.
- **Static Scene**: Modifying rotations inside `animate()` but forgetting `renderer.render(scene, camera)`.

#### Key Takeaways
- The 4 essentials: **Scene + Camera + Mesh + Renderer**.
- Coordinates: **X** (horizontal), **Y** (vertical), **Z** (depth).
- `requestAnimationFrame` creates battery-efficient animations synced with display refresh rate.

#### Practice
1. Change `BoxGeometry` into a rectangular platform (`3, 0.2, 2`).
2. Inside `animate()`, add `cube.rotation.x += 0.005`.
3. Add a sphere (`new THREE.SphereGeometry(0.5, 32, 16)`) positioned at `position.y = 1`.

---

### Lesson 02: Cameras & OrbitControls
*Source File: [`cameras.js`](./cameras.js)*

#### What You'll Learn
- Difference between **PerspectiveCamera** and **OrthographicCamera**.
- Field of View (FOV), Aspect Ratio, and Clipping Planes.
- Tracking mouse cursor movements to normalized coordinates (`-0.5` to `+0.5`).
- How to configure **`OrbitControls`** with physics damping.

#### Concept
- **`PerspectiveCamera`**: Mimics the human eye with perspective foreshortening (distant objects look smaller).
- **`OrthographicCamera`**: Renders parallel rays with no perspective distortion (used for isometric games, blueprints, 2D overlays).
- **`OrbitControls`**: Camera helper allowing users to orbit (drag), pan (right-click), and zoom (scroll wheel).

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#fcba03' })
)
scene.add(cube)

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)

// OrbitControls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    controls.update() // Required when damping is enabled
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

#### Code Explanation
1. `import { OrbitControls }`: Imported from `three/examples/jsm/controls/OrbitControls.js`.
2. `new OrbitControls(camera, canvas)`: Connects mouse events on the canvas to camera positioning.
3. `controls.enableDamping = true`: Smooths camera motion with deceleration.
4. `controls.update()`: Computes inertia updates every frame in the `tick` loop.

#### Key APIs
- `new THREE.PerspectiveCamera(fov, aspect, near, far)` — Frustum perspective camera.
- `new THREE.OrthographicCamera(left, right, top, bottom, near, far)` — Parallel projection camera.
- `new OrbitControls(camera, domElement)` — Camera controller.
- `controls.enableDamping = true` — Inertial smoothing.
- `controls.minDistance` / `controls.maxDistance` — Zoom constraints.

#### Common Mistakes
- **Jittery Controls**: Enabling `controls.enableDamping = true` but forgetting `controls.update()` inside `tick()`.
- **Event Conflicts**: Passing `document.body` instead of `canvas` to `OrbitControls`.
- **Z-Fighting**: Setting `near: 0.00001` and `far: 999999`, causing depth buffer precision collapse.

#### Key Takeaways
- Use `PerspectiveCamera` for 95% of 3D apps.
- Always use `enableDamping = true` for high-quality camera handling.

#### Practice
1. Restrict zoom distance: `controls.minDistance = 2`, `controls.maxDistance = 8`.
2. Prevent camera from viewing under the ground: `controls.maxPolarAngle = Math.PI / 2`.
3. Enable auto rotation: `controls.autoRotate = true`.

---

### Lesson 03: Fullscreen & Viewport Resizing
*Source File: [`fullScreen.js`](./fullScreen.js)*

#### What You'll Learn
- Responding dynamically to window resize events.
- Recalculating `camera.aspect` and calling `camera.updateProjectionMatrix()`.
- Handling Retina / high-DPI displays with `devicePixelRatio` safely.
- Multi-browser fullscreen toggle on double-click.

#### Concept
- When the browser resizes, canvas dimensions, aspect ratio, and projection matrix must update to prevent distortion.
- High-DPI screens (Retina) have pixel ratios $\ge 2$. Setting `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` makes graphics crisp without overloading GPU on mobile.

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#fcba03' })
)
scene.add(cube)

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize Handler
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Fullscreen Handler (Double-Click)
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) canvas.requestFullscreen()
        else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen()
    } else {
        if (document.exitFullscreen) document.exitFullscreen()
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
    }
})

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

#### Code Explanation
1. `camera.aspect = sizes.width / sizes.height`: Updates aspect ratio.
2. `camera.updateProjectionMatrix()`: Recalculates mathematical perspective matrix.
3. `renderer.setSize(sizes.width, sizes.height)`: Resizes canvas buffer.
4. `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`: Caps pixel ratio at 2.
5. Vendor prefixes (`webkitFullscreenElement`, `webkitRequestFullscreen`): Ensures full Safari/macOS compatibility.

#### Key APIs
- `camera.updateProjectionMatrix()` — Updates camera mathematical projection matrix.
- `renderer.setSize(w, h)` — Resizes WebGL render target.
- `renderer.setPixelRatio(ratio)` — Sets pixel ratio multiplier.
- `canvas.requestFullscreen()` — Requests fullscreen viewport.

#### Common Mistakes
- **Distorted Geometry on Window Resize**: Changing `camera.aspect` but forgetting `camera.updateProjectionMatrix()`.
- **GPU Overheating on 4K Screens**: Setting `renderer.setPixelRatio(window.devicePixelRatio)` without `Math.min(..., 2)`.

#### Key Takeaways
- Always bind a `resize` listener in production.
- Always call `camera.updateProjectionMatrix()` when camera settings change.

#### Practice
1. Add a keydown listener for the `'f'` key to toggle fullscreen.
2. Verify in `style.css` that `body { margin: 0; overflow: hidden; }` is present.

---

### Lesson 04: Geometries & BufferGeometry
*Source File: [`geometries.js`](./geometries.js)*

#### What You'll Learn
- How 3D meshes are built from vertices and triangles.
- The structure of `BufferGeometry`.
- Using `Float32Array` and `BufferAttribute` to build custom procedural meshes.
- Generating multiple random triangles.

#### Concept
- Every 3D mesh is made of **triangles**.
- 1 triangle = **3 vertices**.
- 1 vertex = **3 coordinates** ($X, Y, Z$).
- 1 triangle = **9 float values** in a `Float32Array`.

```
Triangle:
Vertex 1 (x, y, z) ──┐
Vertex 2 (x, y, z) ──┼──> Float32Array [9 values] ──> BufferAttribute(3) ──> BufferGeometry
Vertex 3 (x, y, z) ──┘
```

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

// Procedural BufferGeometry (50 Triangles)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

const geometry = new THREE.BufferGeometry()
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ color: '#fcba03', wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

#### Code Explanation
1. `new Float32Array(count * 3 * 3)`: Creates a linear, high-speed binary array in memory.
2. `new THREE.BufferAttribute(positionsArray, 3)`: Tells Three.js that each vertex uses 3 consecutive array values.
3. `geometry.setAttribute('position', positionsAttribute)`: Assigns vertex positions to the GPU shader.
4. `wireframe: true`: Shows triangle wireframes.

#### Key APIs
- `new THREE.BufferGeometry()` — Base class for all geometries.
- `new THREE.BufferAttribute(typedArray, itemSize)` — Stores vertex attributes.
- `geometry.setAttribute(name, attribute)` — Binds vertex attributes (`position`, `normal`, `uv`).
- `geometry.computeVertexNormals()` — Computes surface normals for lighting.

#### Common Mistakes
- **Incorrect Array Size**: Array length must be `triangles * 3 vertices * 3 coords`.
- **ItemSize Mistake**: Passing `itemSize = 1` or `2` instead of `3` for 3D coordinates.

#### Key Takeaways
- `BufferGeometry` stores data directly in GPU VRAM.
- Built-in primitives (`BoxGeometry`, `SphereGeometry`) inherit from `BufferGeometry`.

#### Practice
1. Create a single custom triangle with coordinates: `(0,0,0)`, `(0,1,0)`, `(1,0,0)`.
2. Set `material.side = THREE.DoubleSide` and `material.wireframe = false`.

---

### Lesson 05: Debug UI with lil-gui
*Source File: [`debug.js`](./debug.js)*

#### What You'll Learn
- Integrating `lil-gui` for real-time scene tweaking.
- Adding sliders, booleans, color pickers, and function buttons.
- Organizing controls into folders and binding keyboard shortcuts.

#### Concept
A debug panel allows you to tweak variables (positions, rotations, colors, roughness, light angles) in real-time without editing code or reloading the page.

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

// 1. Initialize GUI
const gui = new GUI({ width: 320, title: '⚙️ Scene Debugger' })

window.addEventListener('keydown', (e) => {
    if (e.key === 'h') gui.hide()
    if (e.key === 's') gui.show()
})

const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#fcba03' })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Debug object for non-primitive properties
const debugObject = {
    color: '#fcba03',
    spin: () => {
        gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 })
    }
}

// Folders & Controls
const cubeFolder = gui.addFolder('Cube Controls')
cubeFolder.add(cube.position, 'y', -3, 3, 0.01).name('Elevation')
cubeFolder.add(cube, 'visible').name('Visible')
cubeFolder.add(material, 'wireframe').name('Wireframe')
cubeFolder.addColor(debugObject, 'color').name('Color').onChange(() => {
    material.color.set(debugObject.color)
})
cubeFolder.add(debugObject, 'spin').name('Spin Cube')

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

#### Code Explanation
1. `new GUI()`: Creates floating debug overlay.
2. `gui.add(object, property, min, max, step)`: Detects types (number slider, boolean checkbox, text input).
3. `gui.addColor(debugObject, 'color').onChange(...)`: Modifies color dynamically.
4. `gui.addFolder('Title')`: Groups controls.

#### Key APIs
- `new GUI({ options })` — GUI constructor.
- `gui.add(obj, prop, min, max, step)` — Adds control slider/checkbox.
- `gui.addColor(obj, prop)` — Adds color controller.
- `gui.addFolder(title)` — Creates collapsible folder.
- `controller.name(label)` — Customizes display label.
- `controller.onChange(callback)` — Fires callback on change.

#### Common Mistakes
- **Direct Material Color Binding**: Directly passing `material.color` to `addColor` without `.onChange(() => material.color.set(...))`.
- **Memory Leaks When Recreating Geometries**: Forgetting to call `oldGeometry.dispose()` when updating subdivisions.

#### Key Takeaways
- `lil-gui` speeds up 3D visual tweaking by 10x.
- Group controls logically with `addFolder()`.

#### Practice
1. Add a slider for `camera.fov` (min: 20, max: 120, step: 1) and call `camera.updateProjectionMatrix()` inside `.onChange()`.
2. Add a boolean toggle for `controls.autoRotate`.

---

### Lesson 06: Textures & LoadingManager
*Source File: [`textures.js`](./textures.js)*

#### What You'll Learn
- Loading textures with `TextureLoader` and monitoring progress with `LoadingManager`.
- Managing texture color spaces with `THREE.SRGBColorSpace`.
- Texture repeat, wrapping modes (`wrapS`, `wrapT`), and UV offsets.
- Texture filtering algorithms (`NearestFilter` vs. `LinearMipmapLinearFilter`) and pixel-art optimization.

#### Concept
- **UV Coordinates**: 2D mapping coordinates on geometries determining how an image wraps around 3D surfaces.
- **Color Spaces**: Color maps (diffuse/albedo) must use `THREE.SRGBColorSpace`. Data maps (normals, roughness) stay linear.
- **Filtering**: `NearestFilter` keeps low-resolution textures (e.g. Minecraft 16x16 blocks) crisp without blur.

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 1. Loading Manager
const loadingManager = new THREE.LoadingManager()
loadingManager.onProgress = (url, loaded, total) => {
    console.log(`Loading: ${((loaded / total) * 100).toFixed(0)}%`)
}
loadingManager.onLoad = () => console.log('All textures loaded!')

// 2. Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/static/textures/door/color.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace

// Wrapping & Repeating
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
colorTexture.repeat.set(2, 2)

// Sharp Pixel Art Mode (Uncomment for pixelated art):
// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter

const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ map: colorTexture })
)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

#### Code Explanation
1. `new THREE.LoadingManager()`: Central event hub for asset loading bars.
2. `colorTexture.colorSpace = THREE.SRGBColorSpace`: Ensures realistic color output.
3. `wrapS` and `wrapT`: Enables horizontal and vertical texture repetition.
4. `material.map`: Assigns texture as diffuse color.

#### Key APIs
- `new THREE.TextureLoader(manager)` — Texture loader.
- `new THREE.LoadingManager()` — Tracks loading lifecycle.
- `texture.colorSpace = THREE.SRGBColorSpace` — Sets sRGB profile.
- `texture.wrapS` / `texture.wrapT` — Wrapping modes (`RepeatWrapping`, `MirroredRepeatWrapping`).
- `texture.repeat.set(u, v)` — Tile count.
- `texture.minFilter` / `texture.magFilter` — Sampling filter modes.

#### Common Mistakes
- **Washed Out Colors**: Forgetting `colorTexture.colorSpace = THREE.SRGBColorSpace`.
- **Repeat Doesn't Work**: Changing `texture.repeat.set()` without setting `texture.wrapS = THREE.RepeatWrapping`.
- **Blurry Pixel Art**: Using linear filtering on small retro textures instead of `NearestFilter`.

#### Key Takeaways
- Use `LoadingManager` for loading screens.
- Color maps need `SRGBColorSpace`.
- Use `NearestFilter` for sharp Minecraft/pixel-art styles.

#### Practice
1. Load `minecraft.png` with `textureLoader`.
2. Set `texture.magFilter = THREE.NearestFilter` and compare sharpness.

---

### Lesson 07: Materials & Environment Maps
*Source File: [`materials.js`](./materials.js)*

#### What You'll Learn
- Complete range of Three.js materials: `Basic`, `Normal`, `Matcap`, `Lambert`, `Phong`, `Toon`, `Standard`, and `Physical`.
- PBR texture map channels: `map`, `aoMap`, `displacementMap`, `normalMap`, `roughnessMap`, `metalnessMap`, and `alphaMap`.
- Image-based lighting using 32-bit HDR Environment Maps with **`RGBELoader`**.

#### Concept
- **`MeshStandardMaterial`**: Industry standard Physically Based Rendering (PBR) based on metallic and roughness parameters.
- **`MeshPhysicalMaterial`**: Advanced PBR with glass transmission, clearcoat, and iridescence.
- **`RGBELoader`**: Loads 360° HDR skyboxes that naturally illuminate PBR surfaces with realistic ambient reflections.

| Material | Light Needed? | Performance | Best For |
|---|---|---|---|
| `MeshBasicMaterial` | No | ⚡ Instant | Flat colors, wireframes |
| `MeshNormalMaterial` | No | ⚡ Instant | Normal vector debugging |
| `MeshMatcapMaterial` | No | ⚡ Instant | Fast baked lighting without real lights |
| `MeshLambertMaterial` | Yes | 🚀 Fast | Matte non-shiny objects |
| `MeshPhongMaterial` | Yes | 🚀 Fast | Shiny specular surfaces |
| `MeshToonMaterial` | Yes | 🚀 Fast | Cartoon / Cel shading |
| `MeshStandardMaterial` | Yes | ⚖️ Balanced | Realistic PBR |
| `MeshPhysicalMaterial` | Yes | 🐢 Heavy | Glass, clearcoat, high-end realism |

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

// 1. HDR Environment Map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/static/textures/environmentMap/2k.hdr', (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = envMap
    scene.environment = envMap
})

// 2. Textures
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/static/textures/door/color.jpg')
const doorAoTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/static/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/static/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/static/textures/door/roughness.jpg')
const doorAlphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// 3. PBR Standard Material
const material = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    aoMap: doorAoTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    normalMap: doorNormalTexture,
    alphaMap: doorAlphaTexture,
    transparent: true
})

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 4
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

#### Code Explanation
1. `RGBELoader`: Loads high dynamic range light data from `.hdr` images.
2. `scene.environment = envMap`: Automatically applies ambient reflections to all scene PBR materials.
3. `aoMap`: Adds contact shadows in crevices.
4. `normalMap`: Creates 3D bump details without extra polygons.

#### Key APIs
- `new THREE.MeshStandardMaterial({ ... })` — PBR material.
- `new THREE.MeshPhysicalMaterial({ ... })` — Advanced PBR material.
- `new RGBELoader()` — HDR environment loader.
- `scene.environment` — Global environment reflection map.

#### Common Mistakes
- **Black Objects**: Using `MeshStandardMaterial` without any lights or environment map.
- **Invisible Alpha Map**: Setting `alphaMap` without `transparent = true`.

#### Key Takeaways
- Pair `MeshStandardMaterial` with an HDR environment map for instant realism.
- Normal maps add micro-detail with zero polygon overhead.

#### Practice
1. Convert `material` to `MeshPhysicalMaterial` with `transmission: 1`, `ior: 1.5`, `roughness: 0.1` for glass effect.

---

### Lesson 08: 3D Text & Object Scattering
*Source File: [`text.js`](./text.js)*

#### What You'll Learn
- Loading Typeface JSON fonts with **`FontLoader`**.
- Creating 3D extruded typography with **`TextGeometry`** and bevels.
- Accurately centering 3D text using `geometry.center()`.
- Optimizing GPU performance when scattering hundreds of objects.

#### Concept
- Three.js requires fonts converted into **Typeface JSON** format.
- `TextGeometry` extrudes 2D vector font curves into 3D geometry.
- **GPU Optimization**: To render 100 donuts, instantiate `new THREE.TorusGeometry()` and material **once** outside the loop, and reuse them across all 100 meshes.

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const canvas = document.querySelector('#webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/statics/textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

// Font Loader
const fontLoader = new FontLoader()
fontLoader.load('/static/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Three.js Master', {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 5
    })
    textGeometry.center() // Center origin

    const textMesh = new THREE.Mesh(textGeometry, material)
    scene.add(textMesh)

    // Optimized Donut Scattering (1 Geometry & 1 Material shared among 100 meshes)
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

    for (let i = 0; i < 100; i++) {
        const donut = new THREE.Mesh(donutGeometry, material)
        donut.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        )
        donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
        scene.add(donut)
    }
})

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 6
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

#### Code Explanation
1. `FontLoader`: Loads typeface JSON vector glyphs.
2. `TextGeometry`: Generates 3D extruded mesh with bevels.
3. `textGeometry.center()`: Aligns geometry bounding box center to `(0,0,0)`.
4. Shared `donutGeometry` & `material`: Maximizes GPU performance.

#### Key APIs
- `new FontLoader()` — Typeface JSON font loader.
- `new TextGeometry(text, parameters)` — 3D text geometry.
- `geometry.center()` — Centers geometry around origin.
- `new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments)` — Donut geometry.

#### Common Mistakes
- **Excessive Subdivisions**: Setting `curveSegments` or `bevelSegments` too high causes polygon count explosion and lag.
- **Recreating Geometries in Loops**: Creating `new THREE.TorusGeometry()` inside a 1000-iteration loop exhausts GPU memory.

#### Key Takeaways
- Convert `.ttf` fonts to Typeface JSON using Facetype.js.
- Always center 3D text with `geometry.center()`.
- Re-use geometry and material instances across multiple meshes.

#### Practice
1. Change text string to your custom name or title.
2. Inside `tick()`, rotate all scattered donuts continuously.

---

### Lesson 09: Lights & Helpers
*Source File: [`light.js`](./light.js)*

#### What You'll Learn
- The 6 primary types of lights in Three.js and when to use each.
- How light positioning, intensity, decay, distance, and color work.
- The performance cost ranking of different lights.
- How to use **Light Helpers** (`DirectionalLightHelper`, `PointLightHelper`, `SpotLightHelper`, etc.) to visually debug light sources.
- How to aim `DirectionalLight` and `SpotLight` using their `target` property.

#### Concept

Lights are essential when working with light-reactive materials (like `MeshStandardMaterial`, `MeshPhysicalMaterial`, `MeshLambertMaterial`, `MeshPhongMaterial`, and `MeshToonMaterial`). Without lights, these materials render completely pitch black!

Three.js provides 6 main types of lights:

1. **`AmbientLight`**: Omnidirectional, uniform flat lighting applied equally to all surfaces. Cheap on performance, but does not provide depth, contrast, or shadows.
2. **`DirectionalLight`**: Parallel sun-like rays coming from an infinitely far distance. Ideal for outdoor sunlight/daylight simulation.
3. **`HemisphereLight`**: Dual-colored gradient light (sky color from above, ground color from below). Simulates natural outdoor environmental bounce light with near-zero performance cost.
4. **`PointLight`**: An infinitely small point of light radiating in all 360° directions (like a light bulb or candle). Has `distance` and `decay`.
5. **`RectAreaLight`**: A rectangular light emitting from a planar surface (like a photo studio softbox, TV screen, or neon strip light). *Note: Only works with `MeshStandardMaterial` and `MeshPhysicalMaterial`.*
6. **`SpotLight`**: A cone of light emitting from a point in a single direction (like a stage spotlight, flashlight, or street lamp). Features `angle`, `penumbra`, `distance`, and `decay`.

#### Performance Cost of Lights
Always use the minimum number of lights needed:
- 🟢 **Minimal Cost**: `AmbientLight`, `HemisphereLight`
- 🟡 **Moderate Cost**: `DirectionalLight`, `PointLight`
- 🔴 **High Cost**: `SpotLight`, `RectAreaLight`

```
Light Types Visualized:

Ambient:       Directional:      Hemisphere:      Point:          Spot:           RectArea:
  ░░░░░░░        ↓↓↓↓↓↓↓↓          ☁️ Sky Color      \   |   /         \     /         ┌──────┐
  ░░░░░░░        ↓↓↓↓↓↓↓↓              ▼             -- (●) --         \ (●) /          │ 💡   │
  ░░░░░░░        ↓↓↓↓↓↓↓↓          🌿 Ground Color   /   |   \          \   /           └──────┘
 (Everywhere)   (Parallel Sun)   (Dual Sky/Ground) (360° Bulb)     (Cone Light)      (Softbox Panel)
```

#### Example
```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const canvas = document.querySelector('canvas.webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

// 1. Ambient Light (General soft baseline fill)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
scene.add(ambientLight)

// 2. Directional Light (Sunlight)
const directionalLight = new THREE.DirectionalLight(0xf00fff, 0.5)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

// 3. Hemisphere Light (Sky top: Red, Ground bottom: Blue)
const hemiLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5)
scene.add(hemiLight)

// 4. Point Light (Omnidirectional Bulb)
const pointLight = new THREE.PointLight(0xffffff, 0.5, 10, 2)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

// 5. RectArea Light (Neon / Studio Panel)
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1)
rectAreaLight.position.set(0, 0, 0)
scene.add(rectAreaLight)

// 6. Spot Light (Cone / Flashlight)
const spotLight = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(1, 0.5, 1)
scene.add(spotLight)

// Aim the spotlight target (must be added to the scene!)
spotLight.target.position.x = 0
scene.add(spotLight.target)

// 7. Light Helpers (Visual debugging wireframes)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(spotLightHelper, pointLightHelper, directionalLightHelper)

// 8. Objects & Materials
const material = new THREE.MeshStandardMaterial({ roughness: 0.4 })

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
torus.position.x = 1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 100, 100), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

// 9. Camera & Controls
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// 10. Renderer & Animation Loop
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
```

#### Code Explanation
1. `new THREE.AmbientLight(color, intensity)`: Creates uniform base lighting with no shadows or directionality.
2. `new THREE.DirectionalLight(color, intensity)`: Rays travel parallel from `position` towards `target` (default target is `(0, 0, 0)`).
3. `new THREE.HemisphereLight(skyColor, groundColor, intensity)`: Creates a gradient of illumination between sky and ground.
4. `new THREE.PointLight(color, intensity, distance, decay)`: `distance` defines maximum light reach (`0` = infinite). `decay` controls realistic physical dimming rate (`2` is physically accurate).
5. `spotLight.target.position.x = 0; scene.add(spotLight.target)`: Unlike normal objects, moving a `SpotLight` target requires explicitly adding `spotLight.target` to the scene.
6. `new THREE.SpotLightHelper(...)` & `new THREE.DirectionalLightHelper(...)`: Wireframe visualizers that draw the light cones, vectors, and boundaries.

#### Key APIs
- `new THREE.AmbientLight(color, intensity)` — Omnidirectional flat lighting.
- `new THREE.DirectionalLight(color, intensity)` — Sun-like parallel lighting.
- `new THREE.HemisphereLight(skyColor, groundColor, intensity)` — Sky and ground dual light.
- `new THREE.PointLight(color, intensity, distance, decay)` — Point light source.
- `new THREE.RectAreaLight(color, intensity, width, height)` — Planar rectangular light.
- `new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)` — Conical spotlight.
- `new THREE.SpotLightHelper(spotLight)` / `new THREE.PointLightHelper(pointLight, size)` — Visual debug helpers.

#### Common Mistakes
- **Forgetting `scene.add(spotLight.target)`**: Changing `spotLight.target.position` will NOT work unless `scene.add(spotLight.target)` is called.
- **Using Too Many Lights**: Every light added adds shader calculations to every vertex and fragment in the scene, which degrades performance on mobile GPUs.
- **Pitch Black Shadows with Only Directional Light**: Without an `AmbientLight` or `HemisphereLight` fill, the non-illuminated sides of objects will be completely pitch black.
- **RectAreaLight Not Lighting Materials**: Expecting `RectAreaLight` to illuminate `MeshBasicMaterial` or `MeshLambertMaterial` (it only works with `MeshStandardMaterial` and `MeshPhysicalMaterial`).

#### Key Takeaways
- Use **`AmbientLight` + `DirectionalLight`** or **`HemisphereLight` + `DirectionalLight`** as a reliable starting baseline for outdoor 3D scenes.
- Use **Light Helpers** during development to visually align light vectors and cone angles.
- Keep light count minimal for optimal 60 FPS performance.

#### Practice
1. In `light.js`, add a `lil-gui` slider to control `ambientLight.intensity` between `0` and `5`.
2. Animate the `pointLight` moving in a circular orbit around the central cube inside the `tick()` animation loop:
   ```javascript
   pointLight.position.x = Math.cos(elapsedTime) * 2
   pointLight.position.z = Math.sin(elapsedTime) * 2
   ```
3. Adjust `spotLight.penumbra` between `0` (hard edge) and `1` (ultra-soft feathered edge) to observe the shadow gradient.

---

### Lesson 10: Shadows & Shadow Maps
*Source File: [`shadows.js`](./shadows.js)*

#### What You'll Learn
- How **Shadow Maps** work under the hood in Three.js (internal depth render passes).
- The **4 mandatory steps** required to activate dynamic real-time shadows.
- How to optimize shadow map resolution (`mapSize`), near/far clipping planes, and camera frustum bounds (`top`, `bottom`, `left`, `right`).
- Shadow filtering algorithms: `BasicShadowMap`, `PCFShadowMap`, and `PCFSoftShadowMap`.
- How to debug shadow cameras visually using **`CameraHelper`**.
- Alternative high-performance shadow techniques: **Baked Shadows** and **Dynamic Alpha Shadow Planes**.

---

#### Concept

In real life, shadows happen when an object blocks light rays. In 3D graphics, shadows do **not** happen automatically—they must be explicitly calculated using **Shadow Maps**.

### 1. How Shadow Maps Work
1. When rendering starts, Three.js performs a **first render pass** from the perspective of each shadow-casting light.
2. It captures a monochrome depth texture called a **Shadow Map** (storing how far the nearest surface is from the light).
3. In the **second render pass**, when rendering pixels from the player camera, Three.js checks if a pixel is farther than the recorded depth in the Shadow Map. If it is, the pixel is in shadow!

```
Step 1: Light Shadow Pass            Step 2: Camera Render Pass
         💡 [Light]                           📷 [Camera]
          \                                    /
           ▼                                  ▼
      [Sphere]  ──> (Records Depth)      [Is pixel behind depth?]
         |                                    |
         ▼                                    ▼
   [Floor Plane]                         [Draws Dark Shadow]
```

### 2. The 4 Mandatory Rules for Dynamic Shadows
Dynamic shadows will **only** work if all 4 conditions are met:
1. **Renderer**: `renderer.shadowMap.enabled = true`
2. **Light**: `light.castShadow = true` *(Supported on: `DirectionalLight`, `PointLight`, `SpotLight`)*
3. **Casting Mesh**: `mesh.castShadow = true` *(The object blocking light)*
4. **Receiving Mesh**: `floor.receiveShadow = true` *(The surface catching shadow)*

### 3. Types of Shadows & Performance
Dynamic shadows require re-rendering your scene for every shadow-casting light on every frame, which is heavy on mobile devices.

| Shadow Technique | Performance | Pros | Cons |
|---|---|---|---|
| **Real-time Shadow Maps** | 🐢 Heavy | Dynamic, moves with lights & objects | High GPU cost, requires tuning frustum |
| **Baked Texture Shadows** | ⚡ Instant | Photo-realistic, zero runtime GPU cost | Completely static, cannot move |
| **Simple Alpha Shadow Plane** | 🚀 Very Fast | Lightweight, moves dynamically with mesh | Flat fake shadow on 2D planes only |

---

#### Example

```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()

// 1. Textures for Baked / Simple Shadows
const textureLoader = new THREE.TextureLoader()
const simpleShadowTexture = textureLoader.load('./textures/simpleShadow.jpg')
simpleShadowTexture.colorSpace = THREE.SRGBColorSpace

// 2. Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
directionalLight.position.set(2, 2, -1)

// Enable shadow on light
directionalLight.castShadow = true

// Shadow Map Resolution (powers of 2: 512, 1024, 2048)
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Tighten Shadow Camera Frustum (Crucial for high sharpness & performance)
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2

scene.add(directionalLight)

// Optional: Visual Debugger for Directional Light Shadow Camera
// const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(shadowCameraHelper)

// 3. Materials & Objects
const material = new THREE.MeshStandardMaterial({ roughness: 0.7 })

// Bouncing Sphere (Casts shadow)
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.castShadow = true

// Floor Plane (Receives shadow)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
plane.receiveShadow = true

// 4. Alternative: Simple Dynamic Fake Shadow Plane
const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadowTexture,
        opacity: 0.7
    })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01 // Lift slightly (-0.49) to prevent Z-fighting

scene.add(sphere, plane, sphereShadow)

// 5. Camera & OrbitControls
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// 6. Renderer (MUST enable shadowMap on renderer)
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap // Soft blur edges

// 7. Animation Loop
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate Bouncing Sphere
    sphere.position.x = Math.sin(elapsedTime * 0.5) * 2
    sphere.position.z = Math.cos(elapsedTime * 0.5) * 2
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3)) * 1.5

    // Sync Shadow Plane with Sphere Position
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    
    // Scale & Fade shadow dynamically based on sphere altitude
    const shadowScale = 1 - sphere.position.y * 0.3
    sphereShadow.scale.set(shadowScale, shadowScale, shadowScale)
    sphereShadow.material.opacity = (1 - sphere.position.y * 0.5) * 0.7

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
```

---

#### Code Explanation

1. **`renderer.shadowMap.enabled = true`**: Activates the shadow mapping pipeline inside the WebGL engine.
2. **`renderer.shadowMap.type = THREE.PCFSoftShadowMap`**: Uses Percentage-Closer Filtering with Gaussian smoothing to create soft, natural shadow edges.
3. **`directionalLight.shadow.mapSize.width = 1024`**: Increases shadow resolution from the default 512x512 to 1024x1024 to eliminate pixelated stair-stepping (aliasing).
4. **`directionalLight.shadow.camera.top / bottom / left / right`**: Sets the bounds of the orthographic shadow camera. Fitting the box tightly around the object ensures the 1024x1024 shadow map is concentrated strictly on the visible area.
5. **`new THREE.CameraHelper(directionalLight.shadow.camera)`**: Renders a red wireframe box showing the exact coverage of the shadow camera.
6. **Dynamic Shadow Plane (`sphereShadow`)**:
   - `alphaMap: simpleShadowTexture`: Uses the grayscale texture as an opacity mask (white is opaque, black is transparent).
   - `position.y = -0.49`: Placing it 0.01 units above the floor (`-0.50`) prevents **Z-fighting** (flickering texture overlap).
   - Dynamic scaling & opacity: As the ball bounces higher, the shadow expands and fades out.

---

#### Key APIs

- `renderer.shadowMap.enabled = true` — Turns on shadow rendering globally.
- `renderer.shadowMap.type` — Shadow algorithm (`THREE.BasicShadowMap`, `THREE.PCFShadowMap`, `THREE.PCFSoftShadowMap`, `THREE.VSMShadowMap`).
- `light.castShadow = true` — Enables light to cast shadows.
- `mesh.castShadow = true` — Marks mesh to cast shadow into depth buffer.
- `mesh.receiveShadow = true` — Marks surface to receive and display shadows.
- `light.shadow.mapSize.set(1024, 1024)` — Sets shadow buffer texture resolution.
- `light.shadow.camera` — The internal camera used to render the shadow map (`OrthographicCamera` for DirectionalLight, `PerspectiveCamera` for SpotLight/PointLight).
- `new THREE.CameraHelper(light.shadow.camera)` — Helper to visualize shadow camera frustum.

---

#### Common Mistakes

- **Forgetting `renderer.shadowMap.enabled = true` at Init**: Placing it inside a `resize` event or forgetting it causes all shadows to be completely invisible.
- **Forgetting `plane.receiveShadow = true`**: Objects cast shadows, but without `receiveShadow = true` on the floor, no shadow appears.
- **Shared Material Reference Bug**: Assigning the same `material` instance to both the sphere and the floor, then modifying `sphere.material.map` updates both objects simultaneously.
- **Z-Fighting on Baked Shadow Planes**: Placing a shadow quad at the exact same Y coordinate as the floor (`position.y = -0.5`), causing GPU depth fighting and flickering black triangles. Always offset by `+0.01` (`-0.49`).
- **Shadow Frustum Too Large**: Leaving shadow camera near/far/bounds at default massive sizes, causing shadow maps to look extremely low-resolution and pixelated.

---

#### Key Takeaways

- To activate real-time shadows, you must configure **all 4**: Renderer + Light + Casting Mesh + Receiving Mesh.
- Always optimize the `light.shadow.camera` bounds to fit your scene tightly for razor-sharp shadows with minimal GPU load.
- Use `THREE.PCFSoftShadowMap` for smooth, realistic shadow penumbras.
- For mobile web experiences, use **baked shadow textures** or **simple alpha shadow planes** to achieve 60 FPS without GPU strain.

---

#### Practice

1. In `shadows.js`, uncomment `SpotLight` and test casting conical spotlight shadows with `spotLight.castShadow = true`.
2. Connect `directionalLight.shadow.camera.near` and `far` to `lil-gui` to see how clipping cuts off shadows in real-time.
3. Make the bouncing sphere speed configurable with a GUI slider.


---




