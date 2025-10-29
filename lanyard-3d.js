import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Lanyard3D {
    constructor() {
        this.container = document.getElementById('lanyard-container');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.clock = new THREE.Clock();
        
        this.init();
        this.loadModel();
        this.animate();
    }

    init() {
        // Setup camera - match container size
        const width = 250;
        const height = 320;
        
        this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 7);
        this.camera.lookAt(0, 0, 0);

        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight1.position.set(5, 5, 5);
        this.scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-5, -3, -5);
        this.scene.add(directionalLight2);
        
        // Mouse interaction
        this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.container.addEventListener('mouseleave', () => {
            // Reset on mouse leave
            if (this.model) {
                this.rotationY = Math.PI / 4;
                this.rotationVelocity = 0;
            }
        });
    }

    async loadModel() {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();
        
        try {
            const gltf = await loader.loadAsync('./land/card.glb');
            this.model = gltf.scene;
            
            // Load lanyard strap texture
            const strapTexture = textureLoader.load('./land/lanyard.png', (texture) => {
                texture.flipY = false;
            });
            
            // Calculate bounding box of the card
            const box = new THREE.Box3().setFromObject(this.model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Calculate scale to fit the model in view
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 4.0 / maxDim;
            
            // Scale and center the card model
            this.model.scale.set(scale, scale, scale);
            this.model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
            
            // Create the lanyard strap using the texture
            this.createLanyardStrap(strapTexture, size, scale, center);
            
            // Group card and strap together
            const group = new THREE.Group();
            group.add(this.model);
            if (this.strap) {
                group.add(this.strap);
            }
            this.model = group; // Replace model reference with group
            
            // Make sure all meshes are visible
            this.model.traverse((child) => {
                if (child.isMesh) {
                    child.visible = true;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(mat => {
                                if (mat) mat.needsUpdate = true;
                            });
                        } else {
                            child.material.needsUpdate = true;
                        }
                    }
                }
            });
            
            this.scene.add(this.model);
            
            // Recalculate bounding box including strap
            const fullBox = new THREE.Box3().setFromObject(this.model);
            const fullSize = fullBox.getSize(new THREE.Vector3());
            const fullScaledSize = new THREE.Vector3(fullSize.x, fullSize.y, fullSize.z);
            const distance = Math.max(fullScaledSize.x, fullScaledSize.y, fullScaledSize.z) * 2.2;
            this.camera.position.set(0, 0, distance);
            this.camera.lookAt(0, 0, 0);
            
            // Store base camera distance for animation
            this.baseCameraZ = distance;
            
            // Set initial rotation
            this.model.rotation.y = Math.PI / 4;
        } catch (error) {
            console.error('Error loading GLB model:', error);
            // Fallback: create a simple card with strap
            await this.createFallbackCard();
        }
    }
    
    createLanyardStrap(texture, cardSize, cardScale, cardCenter) {
        // Create strap geometry (ribbon/plane that curves slightly)
        const strapLength = 2.5; // Length of strap
        const strapWidth = 0.15; // Width of strap
        
        // Create a curved strap using a tube geometry or multiple planes
        const strapSegments = 32;
        const strapGeometry = new THREE.PlaneGeometry(strapWidth, strapLength, 1, strapSegments);
        
        // Apply slight curve to the strap
        const positions = strapGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const y = positions.getY(i);
            const normalizedY = (y / strapLength) * 2 - 1; // -1 to 1
            // Add slight curve based on y position
            positions.setZ(i, normalizedY * normalizedY * 0.1);
        }
        positions.needsUpdate = true;
        strapGeometry.computeVertexNormals();
        
        // Create material with lanyard texture
        const strapMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            metalness: 0.3,
            roughness: 0.7
        });
        
        this.strap = new THREE.Mesh(strapGeometry, strapMaterial);
        
        // Position strap above the card
        const cardTop = (-cardCenter.y * cardScale) + (cardSize.y * cardScale / 2);
        this.strap.position.set(
            -cardCenter.x * cardScale,
            cardTop + strapLength / 2 + 0.05,
            -cardCenter.z * cardScale
        );
        
        // Rotate strap to hang naturally
        this.strap.rotation.z = Math.PI / 2;
    }

    async createFallbackCard() {
        const textureLoader = new THREE.TextureLoader();
        
        // Create card
        const cardGeometry = new THREE.BoxGeometry(1.5, 2, 0.1);
        const cardMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a1a,
            metalness: 0.3,
            roughness: 0.4
        });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.position.set(0, 0, 0);
        
        // Load lanyard texture for strap
        try {
            const strapTexture = textureLoader.load('./land/lanyard.png', (texture) => {
                texture.flipY = false;
            });
            
            // Create strap with texture
            const strapLength = 2.5;
            const strapWidth = 0.15;
            const strapGeometry = new THREE.PlaneGeometry(strapWidth, strapLength, 1, 32);
            
            // Apply slight curve
            const positions = strapGeometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                const y = positions.getY(i);
                const normalizedY = (y / strapLength) * 2 - 1;
                positions.setZ(i, normalizedY * normalizedY * 0.1);
            }
            positions.needsUpdate = true;
            strapGeometry.computeVertexNormals();
            
            const strapMaterial = new THREE.MeshStandardMaterial({
                map: strapTexture,
                side: THREE.DoubleSide,
                transparent: true,
                metalness: 0.3,
                roughness: 0.7
            });
            
            const strap = new THREE.Mesh(strapGeometry, strapMaterial);
            strap.position.set(0, 1.2, 0);
            strap.rotation.z = Math.PI / 2;
            
            // Group card and strap together
            const group = new THREE.Group();
            group.add(card);
            group.add(strap);
            this.scene.add(group);
            this.model = group;
        } catch (error) {
            // If texture fails, use simple colored strap
            const strapGeometry = new THREE.PlaneGeometry(0.15, 2.5, 1, 32);
            const strapMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x4caf50,
                side: THREE.DoubleSide,
                metalness: 0.2,
                roughness: 0.6
            });
            const strap = new THREE.Mesh(strapGeometry, strapMaterial);
            strap.position.set(0, 1.2, 0);
            strap.rotation.z = Math.PI / 2;
            
            const group = new THREE.Group();
            group.add(card);
            group.add(strap);
            this.scene.add(group);
            this.model = group;
        }
        
        // Adjust camera to see full model
        this.camera.position.set(0, 0, 6);
        this.camera.lookAt(0, 0.6, 0);
        this.baseCameraZ = 6;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();
        const delta = this.clock.getDelta();

        if (this.model) {
            // Physics-based pendulum swing with damping
            const swingAmplitude = 0.15;
            const swingFrequency = 0.8;
            const damping = 0.98;
            
            // Calculate pendulum motion
            this.rotationY = this.rotationY || Math.PI / 4;
            this.rotationVelocity = this.rotationVelocity || 0;
            
            // Apply gravity and damping to create realistic swing
            this.rotationVelocity += Math.sin(this.rotationY - Math.PI / 4) * -0.01;
            this.rotationVelocity *= damping;
            this.rotationY += this.rotationVelocity;
            
            // Add small continuous oscillation
            this.rotationY += Math.sin(elapsedTime * swingFrequency) * 0.001;
            
            this.model.rotation.y = this.rotationY;
            
            // Subtle rotation on X axis
            this.model.rotation.x = Math.sin(elapsedTime * 0.4) * 0.03;
            
            // Subtle floating effect with slower oscillation
            this.model.position.y = Math.sin(elapsedTime * 0.6) * 0.08;
            
            // Slight rotation around Z for natural movement
            this.model.rotation.z = Math.sin(elapsedTime * 0.5) * 0.02;
        }

        // Gentle camera movement for depth perception (reduced movement to keep model in view)
        const baseZ = this.baseCameraZ || this.camera.position.z;
        this.camera.position.x = Math.sin(elapsedTime * 0.15) * 0.15;
        this.camera.position.y = Math.sin(elapsedTime * 0.12) * 0.1;
        this.camera.position.z = baseZ + Math.sin(elapsedTime * 0.1) * 0.15;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }
    
    handleMouseMove(event) {
        if (!this.model) return;
        
        const rect = this.container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        
        // Interactive rotation based on mouse position
        this.model.rotation.y = Math.PI / 4 + x * 0.3;
        this.model.rotation.x = -y * 0.2;
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        const width = 250;
        const height = 320;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Lanyard3D();
    });
} else {
    new Lanyard3D();
}

// Handle window resize
window.addEventListener('resize', () => {
    // Resize handled internally if needed
});

