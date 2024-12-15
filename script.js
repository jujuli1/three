import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';





const scene = new THREE.Scene();

// Configuration de la caméra
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

// Configuration du renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajout d'une lumière
const light = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 3);
scene.add(directionalLight);



// Chargement du modèle GLTF
const loader = new GLTFLoader();
let mixer; // Pour gérer les animations
let clock = new THREE.Clock(); // Utile pour mettre à jour les animations
let model;
loader.load(
    '/images/wolf.glb', 
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        model.scale.set(0.02, 0.02, 0.02);

         // Initialisation du mixer pour les animations
         mixer = new THREE.AnimationMixer(model);

         gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
        });

         // Démarrer la première animation si disponible
         if (gltf.animations.length > 0) {
             const action = mixer.clipAction(gltf.animations[0]);
             action.play();
         }
    },
    undefined, 
    (error) => {
        console.error('Erreur lors du chargement du modèle:', error);
    }
);

const textureLoaderF = new THREE.TextureLoader();
const forestTextures = [
    textureLoaderF.load('/images/foret.png'),
    textureLoaderF.load('/images/foret.png'),
    textureLoaderF.load('/images/foret.png'),
    textureLoaderF.load('/images/foret.png'),
    textureLoaderF.load('/images/foret.png'),
    textureLoaderF.load('/images/foret.png'),
    textureLoaderF.load('/images/foret.png'),
    textureLoaderF.load('/images/foret.png'),
];

// Créer des "planes" pour chaque image
const forestPlanes = forestTextures.map((texture, index) => {
    const planeGeometry = new THREE.PlaneGeometry(8, 8); // Taille ajustable
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(index * 6 - 12, 5, -6); // Ajustez les positions
    scene.add(plane);
    return plane;
});

const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('/images/path.jpg'); // Texture d'un chemin
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(1, 1); // Répéter la texture

const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
const groundGeometry = new THREE.PlaneGeometry(100, 50); // Taille du sol
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Met le plan à plat
scene.add(ground);

//Ajout de la Lune (Texture sur une sphère)
const moonTexture = textureLoader.load('/images/moon.png'); 
const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// Positionner la lune derrière le modèle
moon.position.set(1, 10, -10);
scene.add(moon);

const textureLoaderC = new THREE.TextureLoader();
const imageTexture = textureLoaderC.load('/images/foret.png');  // Remplacez par le chemin de votre image

// Créer un plan pour afficher l'image
const imageGeometry = new THREE.PlaneGeometry(5, 5);  // Taille du plan ajustable
const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
const imagePlane = new THREE.Mesh(imageGeometry, imageMaterial);
imagePlane.position.set( 6, 3, -6); // Positionner l'image juste au-dessus du sol
scene.add(imagePlane);

const textureLoaderB = new THREE.TextureLoader();
const imageTextureB = textureLoaderB.load('/images/foret.png');  // Remplacez par le chemin de votre image

// Créer un plan pour afficher l'image
const imageGeometryB = new THREE.PlaneGeometry(5, 5);  // Taille du plan ajustable
const imageMaterialB = new THREE.MeshBasicMaterial({ map: imageTextureB, transparent: true });
const imagePlaneB= new THREE.Mesh(imageGeometryB, imageMaterialB);
imagePlaneB.position.set( -5, 3, -9); // Positionner l'image juste au-dessus du sol
scene.add(imagePlaneB);




// Animation
function animate() {
    let speed = 0.05;
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    

    // Déplacer l'image le long de l'axe Z (ou X selon l'orientation du chemin)
    imagePlane.position.z += 0.05;
    imagePlaneB.position.z += 0.05;  // Ajustez la vitesse du déplacement

    if (imagePlane.position.z > 50) {
        imagePlane.position.z = -50;
    }

    if (imagePlaneB.position.z > 50) {
        imagePlaneB.position.z = -50;
    }

    

    // Mettre à jour les animations si le mixer est défini
    if (mixer) {
        
        mixer.update(delta); // Avance les animations en fonction du temps écoulé
    }

    // Déplacer le modèle dans la direction de la marche (le long de l'axe Z par exemple)
    if (model) {
        model.position.z -= speed - 0.05; // Faire avancer le modèle (déplace l'objet sur l'axe Z)
    }
    groundTexture.offset.y += speed * 0.01;

    /*Faire en sorte que la caméra suive le modèle
    if (model) {
        const modelPosition = new THREE.Vector3();
        model.getWorldPosition(modelPosition);

        // Placer la caméra légèrement derrière et au-dessus du modèle
        camera.position.lerp(
            new THREE.Vector3(modelPosition.x, 2, modelPosition.z + 6),
            0.05 // Ajustez la vitesse de transition
        );

        

        // Faire pointer la caméra vers le modèle
        camera.lookAt(modelPosition);
    }*/

    

    // Faire tourner le modèle si chargé
    //if (model) {
        //model.rotation.y += 0.01; //  Y
        // model.rotation.x += 0.005; // X
    //}

    

    renderer.render(scene, camera);
}
animate();

// Mise à jour taille du canvas redimensionnement  fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


