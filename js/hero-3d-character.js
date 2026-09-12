import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/GLTFLoader.js';

/**
 * 3D Character Integration Module
 * Expects a rigged "character.glb" in the project root.
 */

// Configuration Mapping for Bones and Controls
const RIG_CONFIG = {
  head: {
    aliases: ['head', 'mixamorig:head', 'def_head', 'head_joint'],
    invertYaw: -1, 
    invertPitch: -1 
  },
  neck: {
    aliases: ['neck', 'mixamorig:neck', 'def_neck', 'neck_joint']
  },
  spine: {
    aliases: ['spine', 'spine1', 'spine2', 'chest', 'mixamorig:spine', 'mixamorig:spine2']
  },
  leftEye: {
    aliases: ['lefteye', 'eye_l', 'mixamorig:lefteye', 'eye.l']
  },
  rightEye: {
    aliases: ['righteye', 'eye_r', 'mixamorig:righteye', 'eye.r']
  },
  blinkMorphs: ['blink', 'eyeblink', 'blink_l', 'blink_r', 'eyes_closed']
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('character-3d-canvas');
  const fallbackPoster = document.getElementById('characterPoster');
  const interactionArea = document.getElementById('hero-illus');
  
  if (!container || !interactionArea) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene Setup
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xebeeff, 0.4); 
  fillLight.position.set(-5, 0, 5);
  scene.add(fillLight);

  // State
  let characterModel = null;
  let activeControls = {
    head: null,
    neck: null,
    spine: null,
    leftEye: null,
    rightEye: null,
    skinnedMeshes: []
  };

  // Base Quaternions for additive blending
  let baseQuaternions = new Map();

  let targetYaw = 0;
  let targetPitch = 0;
  let targetNod = 0;
  
  let currentHeadYaw = 0;
  let currentHeadPitch = 0;
  let currentEyeYaw = 0;
  let currentEyePitch = 0;

  // Limits
  const MAX_HEAD_YAW = 15 * (Math.PI / 180);
  const MAX_HEAD_PITCH = 8 * (Math.PI / 180);

  // Helper to find bone by alias
  function findBone(aliases, root) {
    let found = null;
    root.traverse((child) => {
      if (child.isBone && !found) {
        const name = child.name.toLowerCase();
        if (aliases.some(alias => name.includes(alias))) {
          found = child;
        }
      }
    });
    return found;
  }

  // Loader
  const loader = new GLTFLoader();
  loader.load(
    'character.glb',
    (gltf) => {
      characterModel = gltf.scene;
      characterModel.position.set(0, -1, 0); 
      scene.add(characterModel);

      // Validate Rig
      activeControls.head = findBone(RIG_CONFIG.head.aliases, characterModel);
      activeControls.neck = findBone(RIG_CONFIG.neck.aliases, characterModel);
      activeControls.spine = findBone(RIG_CONFIG.spine.aliases, characterModel);
      activeControls.leftEye = findBone(RIG_CONFIG.leftEye.aliases, characterModel);
      activeControls.rightEye = findBone(RIG_CONFIG.rightEye.aliases, characterModel);
      
      characterModel.traverse((child) => {
        if (child.isSkinnedMesh) {
          activeControls.skinnedMeshes.push(child);
        }
      });

      console.log('--- 3D Character Validation ---');
      console.log('Head Control:', activeControls.head ? activeControls.head.name : 'MISSING (Tracking degraded)');
      console.log('Left Eye Control:', activeControls.leftEye ? activeControls.leftEye.name : 'MISSING (Eye leading disabled)');
      console.log('Right Eye Control:', activeControls.rightEye ? activeControls.rightEye.name : 'MISSING');
      console.log('Spine/Chest Control:', activeControls.spine ? activeControls.spine.name : 'MISSING (Breathing disabled)');

      // Store Base Quaternions
      [activeControls.head, activeControls.neck, activeControls.spine, activeControls.leftEye, activeControls.rightEye].forEach(bone => {
        if (bone) baseQuaternions.set(bone.uuid, bone.quaternion.clone());
      });

      if (fallbackPoster) {
        fallbackPoster.style.transition = 'opacity 0.5s ease-out';
        fallbackPoster.style.opacity = '0';
        setTimeout(() => fallbackPoster.style.display = 'none', 500);
      }
      
      container.style.pointerEvents = 'auto';
      startBlinking();
    },
    undefined,
    (error) => {
      console.warn('3D Character model (character.glb) could not be loaded. Falling back to static image.', error);
    }
  );

  let bounds = interactionArea.getBoundingClientRect();
  window.addEventListener('resize', () => {
    bounds = interactionArea.getBoundingClientRect();
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }, { passive: true });

  let pointerActive = false;

  interactionArea.addEventListener('pointermove', (e) => {
    if (prefersReducedMotion) return;
    pointerActive = true;
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    const normX = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, (y - 0.5) * 2));

    targetYaw = RIG_CONFIG.head.invertYaw * normX * MAX_HEAD_YAW;
    targetPitch = RIG_CONFIG.head.invertPitch * normY * MAX_HEAD_PITCH;
  });

  interactionArea.addEventListener('pointerleave', () => {
    pointerActive = false;
    targetYaw = 0;
    targetPitch = 0;
  });

  interactionArea.addEventListener('pointerdown', () => {
    if (prefersReducedMotion) return;
    // Additive click nod
    targetNod = 15 * (Math.PI / 180);
  });

  let blinkTarget = 0;
  let currentBlink = 0;

  function startBlinking() {
    if (prefersReducedMotion) return;
    function blink() {
      blinkTarget = 1; // Morph target 1.0
      setTimeout(() => blinkTarget = 0, 150);
      setTimeout(blink, 3000 + Math.random() * 3000);
    }
    setTimeout(blink, 2000);
  }

  const clock = new THREE.Clock();
  
  // Create rotation objects once to avoid GC
  const tempQuat = new THREE.Quaternion();
  const euler = new THREE.Euler(0, 0, 0, 'YXZ');

  // Use IntersectionObserver to pause loop when offscreen
  let isVisible = false;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  });
  observer.observe(interactionArea);

  function applyAdditiveRotation(bone, yaw, pitch, roll = 0) {
    if (!bone) return;
    const base = baseQuaternions.get(bone.uuid);
    if (!base) return;
    euler.set(pitch, yaw, roll, 'YXZ');
    tempQuat.setFromEuler(euler);
    bone.quaternion.copy(base).multiply(tempQuat);
  }

  function animate() {
    requestAnimationFrame(animate);
    
    if (!isVisible || !characterModel) return;
    const dt = Math.min(clock.getDelta(), 0.1);

    if (!prefersReducedMotion) {
      // Damping
      // Nod decays
      targetNod = THREE.MathUtils.damp(targetNod, 0, 5, dt);
      
      // Eyes lead (fast) - Lambda 15
      currentEyeYaw = THREE.MathUtils.damp(currentEyeYaw, targetYaw, 15, dt);
      currentEyePitch = THREE.MathUtils.damp(currentEyePitch, targetPitch, 15, dt);

      // Head follows (slower) - Lambda 6
      currentHeadYaw = THREE.MathUtils.damp(currentHeadYaw, targetYaw, 6, dt);
      currentHeadPitch = THREE.MathUtils.damp(currentHeadPitch, targetPitch + targetNod, 6, dt);

      // Apply
      applyAdditiveRotation(activeControls.head || activeControls.neck, currentHeadYaw, currentHeadPitch);
      
      // Eyes (relative to head)
      const eyeRelYaw = currentEyeYaw - currentHeadYaw;
      const eyeRelPitch = currentEyePitch - currentHeadPitch;
      applyAdditiveRotation(activeControls.leftEye, eyeRelYaw, eyeRelPitch);
      applyAdditiveRotation(activeControls.rightEye, eyeRelYaw, eyeRelPitch);

      // Blinking Morph Targets
      currentBlink = THREE.MathUtils.damp(currentBlink, blinkTarget, 20, dt);
      activeControls.skinnedMeshes.forEach(mesh => {
        if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
          for (const key of Object.keys(mesh.morphTargetDictionary)) {
            if (RIG_CONFIG.blinkMorphs.some(alias => key.toLowerCase().includes(alias))) {
              const index = mesh.morphTargetDictionary[key];
              mesh.morphTargetInfluences[index] = currentBlink;
            }
          }
        }
      });

      // Breathing
      if (activeControls.spine) {
        const time = clock.getElapsedTime();
        const breathPitch = Math.sin(time * 2.5) * 0.015;
        applyAdditiveRotation(activeControls.spine, 0, breathPitch);
      }
    }

    renderer.render(scene, camera);
  }

  animate();
});
