<template>
  <div class="h-full w-full">
    <h1>Three js page</h1>
    <div class="h-full w-full" ref="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "ThreePage",
  auth: false,
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      light: null,
      cube: null,
      flag: true,
      cubePosition: 0,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    degreeConverter(degree) {
      return Math.PI * (degree / 180);
    },
    init() {
      const container = this.$refs.container;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 5;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      container.appendChild(this.renderer.domElement);

      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      // const geometry = new THREE.CapsuleGeometry(1, 2, 20, 12);
      // const geometry = new THREE.CircleGeometry(2, 8);
      // const geometry = new THREE.ConeGeometry(1, 3, 6);
      const geometry = new THREE.CylinderGeometry(1, 1, 1, 10);

      const material = new THREE.MeshBasicMaterial({ color: "red" });

      // this.cube = new THREE.Mesh(geometry, material);
      this.cube = new THREE.Line(geometry, material);

      // this.light = new THREE.
      this.scene.add(this.cube);

      window.addEventListener("resize", this.onWindowResize);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.update();
    },
    update() {
      this.renderer.render(this.scene, this.camera);
      this.moveAndRotateSimple(this.cube);
    },
    moveAndRotateSimple(cube) {
      cube.rotation.y += this.degreeConverter(1);
      cube.rotation.x += this.degreeConverter(1);
      cube.position.x = 4 * Math.sin((this.cubePosition += 0.02));
    },
    moveAndRotate(cube) {
      cube.rotation.y += this.degreeConverter(1);
      cube.rotation.x += this.degreeConverter(1);
      if (cube.position.x > 3) {
        this.flag = false;
      } else if (cube.position.x < -3) {
        this.flag = true;
      }
      if (this.flag) {
        cube.position.x += 0.01;
      } else {
        cube.position.x -= 0.01;
      }
    },
  },
};
</script>
