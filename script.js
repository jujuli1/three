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
const light = new THREE.AmbientLight(0xffffff, 0.2); 
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

        model.traverse((node) => {
            if (node.isMesh && node.material) {
                // Réduction de l'éclairage et ajout d'une teinte sombre
                node.material.color.multiplyScalar(0.2); // Réduit l'intensité de la couleur
                node.material.emissiveIntensity = 0.3; // Limite l'émissivité
                node.material.roughness = 0.9; // Augmente la rugosité pour un effet plus terne
            }
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

let grassClones = []; 

// Chargement du modèle GLTF de l'herbe
let mixer3;
let grassModel;
loader.load('/images/grass.glb', (gltf) => {
    grassModel = gltf.scene;

    const positions = [
        { x: 5, y: 0, z: -2 },  // Position 1
        { x: 5, y: 0, z: -1 },   
        { x: 5, y: 0, z: -1 },
        { x: 5, y: 0, z: 1 },  
        { x: 5, y: 0, z: 1 },  
        { x: 5, y: 0, z: 2 },    
        { x: 5, y: 0, z: 3 },   
        { x: 5, y: 0, z: 8 },  
        { x: 5, y: 0, z: 10 },
        { x: 5, y: 0, z: 12 },    
        { x: 5, y: 0, z: 14 },   
        { x: 5, y: 0, z: 16 },   
        { x: 5, y: 0, z: 18 }, 
        { x: 5, y: 0, z: 20 },  
        { x: 5, y: 0, z: 22 },   
        { x: 5, y: 0, z: 24 },   
        { x: 5, y: 0, z: 26 },
        { x: 5, y: 0, z: 28 },    
        { x: 5, y: 0, z: 30 },   
        { x: 5, y: 0, z: 32 },   
        { x: 5, y: 0, z: 34 },   
        { x: 5, y: 0, z: 36 },   
        { x: 5, y: 0, z: 38 }, 
        { x: 5, y: 0, z: 40 },    
        { x: 5, y: 0, z: 42 },   
        { x: 5, y: 0, z: 44 },   
        { x: 5, y: 0, z: 46 },   
        { x: 5, y: 0, z: 48 }, 
        { x: 5, y: 0, z: 50 },    
        { x: 5, y: 0, z: 52 },   
        { x: 5, y: 0, z: 54 },   
        { x: 5, y: 0, z: 56 }, 
        { x: 5, y: 0, z: 58 },    
        { x: 5, y: 0, z: 60 },   
        { x: 5, y: 0, z: 62 },   
        { x: 5, y: 0, z: 64 },   
        { x: 5, y: 0, z: 66 },   
        { x: 5, y: 0, z: 68 }, 
        { x: 5, y: 0, z: 70 },    
        { x: 5, y: 0, z: 72 },   
        { x: 5, y: 0, z: 74 },
        { x: 5, y: 0, z: 76 },   
        { x: 5, y: 0, z: 78 },   
        { x: 5, y: 0, z: 80 },   
        { x: 5, y: 0, z: 82 },   
        { x: 5, y: 0, z: 84 }, 
        { x: 5, y: 0, z: 86 },    
        { x: 5, y: 0, z: 88 },   
        { x: 5, y: 0, z: 90 },
            // Position 2  
        { x: -5, y: 0, z: 22 },  
        { x: -5, y: 0, z: 24 },   
        
         
        
        { x: -5, y: 0, z: 84 }, 
        { x: -5, y: 0, z: 86 },    
        { x: -5, y: 0, z: 88 },   
        { x: -5, y: 0, z: 90 },
    ];

    // Initialisation du mixer pour les animations
    mixer3 = new THREE.AnimationMixer(grassModel);

    gltf.animations.forEach((clip) => {
       const action = mixer3.clipAction(clip);
       action.setLoop(THREE.LoopRepeat, Infinity);
       action.timeScale = 1; // Ralentit l'animation
       action.play();
   });

   

    // Démarrer la première animation si disponible
    if (gltf.animations.length > 0) {
        const action = mixer3.clipAction(gltf.animations[0]);
        action.play();
    }
    
    // Dupliquer le modèle d'herbe et le positionner
    positions.forEach((pos) => {
        const grassClone = grassModel.clone(); // Cloner le modèle
        grassClone.scale.set(0.2, 0.2, 0.2);   // Ajuster la taille de l'herbe
        grassClone.position.set(pos.x, pos.y, pos.z); // Positionner selon les coordonnées définies
        scene.add(grassClone);
        grassClones.push(grassClone);
        
        
    });
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle d\'herbe:', error);
});



let grassClones2 = []; 

// Chargement du modèle GLTF de l'herbe
let grassModel2;
loader.load('/images/grass.glb', (gltf) => {
    grassModel2 = gltf.scene;

    const positions = [
        { x: 5, y: 0, z: -2 },  // Position 1
        { x: 5, y: 0, z: -1 },   
        { x: 5, y: 0, z: -1 },
        { x: 5, y: 0, z: 1 },  
           
         
        { x: 5, y: 0, z: 18 }, 
        { x: 5, y: 0, z: 20 },  
        { x: 5, y: 0, z: 22 },   
        
        { x: 5, y: 0, z: 28 },    
        { x: 5, y: 0, z: 30 },   
        { x: 5, y: 0, z: 32 },   
        { x: 5, y: 0, z: 34 },   
        { x: 5, y: 0, z: 36 },   
        { x: 5, y: 0, z: 38 }, 
           
        { x: 5, y: 0, z: 44 },   
        { x: 5, y: 0, z: 46 },   
        { x: 5, y: 0, z: 48 }, 
        { x: 5, y: 0, z: 50 },    
        { x: 5, y: 0, z: 52 },   
        { x: 5, y: 0, z: 54 },   
          
        { x: 5, y: 0, z: 62 },   
        { x: 5, y: 0, z: 64 },   
        { x: 5, y: 0, z: 66 },   
        { x: 5, y: 0, z: 68 }, 
        { x: 5, y: 0, z: 70 },    
        { x: 5, y: 0, z: 72 },   
        { x: 5, y: 0, z: 74 },
        { x: 5, y: 0, z: 76 },   
          
        { x: 5, y: 0, z: 80 },   
        { x: 5, y: 0, z: 82 },   
       
        { x: 5, y: 0, z: 90 },
           
            // Position 2  
        { x: -5, y: 0, z: 8 },   
        
        
        { x: -5, y: 0, z: 66 },   
        { x: -5, y: 0, z: 68 }, 
        { x: -5, y: 0, z: 70 },    
        { x: -5, y: 0, z: 72 },   
        { x: -5, y: 0, z: 74 },
         
        { x: -5, y: 0, z: 84 }, 
        { x: -5, y: 0, z: 86 },    
        { x: -5, y: 0, z: 88 },   
        { x: -5, y: 0, z: 90 },
    ];
    
    // Dupliquer le modèle d'herbe et le positionner
    positions.forEach((pos) => {
        const grassClone2 = grassModel2.clone(); // Cloner le modèle
        grassClone2.scale.set(0.2, 0.4, 0.2);   // Ajuster la taille de l'herbe
        grassClone2.position.set(pos.x, pos.y, pos.z); // Positionner selon les coordonnées définies
        scene.add(grassClone2);
        grassClones2.push(grassClone2);
        
        
    });
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle d\'herbe:', error);
});

/*Load car.glb


let carModel;

loader.load('/images/car.glb', (gltf) => {
    carModel = gltf.scene;
    carModel.scale.set(1.5, 1.5, 1.5); // Redimensionner le modèle
    carModel.position.set(-3, 0, 92); // Position initiale de la voiture
    scene.add(carModel);
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle de voiture:', error);
});*/












//Load des maisons


let homeModel;

loader.load('/images/home.glb', (gltf) => {
    homeModel = gltf.scene;
    homeModel.scale.set(0.011, 0.011, 0.011); // Redimensionner le modèle
    homeModel.position.set(-4.2, 2, -5); // Position initiale de la maison
    scene.add(homeModel);
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle de maison:', error);
});
let slumModel;

loader.load('/images/slum.glb', (gltf) => {
    slumModel = gltf.scene;
    slumModel.scale.set(1, 1, 1); // Redimensionner le modèle
    slumModel.position.set(-6, 0, 2); // Position initiale de la maison
    slumModel.rotation.y = Math.PI / 2; //rotation
    scene.add(slumModel);
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle de maison:', error);
});

let homeModel2;

loader.load('/images/home.glb', (gltf) => {
    homeModel2 = gltf.scene;
    homeModel2.scale.set(0.011, 0.011, 0.011); // Redimensionner le modèle
    homeModel2.position.set(-4.2, 2, 14); // Position initiale de la maison
    scene.add(homeModel2);
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle de maison:', error);
});


let stationModel;

loader.load('/images/station.glb', (gltf) => {
    stationModel = gltf.scene;
    stationModel.scale.set(3.7, 3.7, 3.7); // Redimensionner le modèle
    stationModel.position.set(-6.2, -1, 20); // Position initiale de la maison
    stationModel.rotation.y = Math.PI / 2; //rotation
    scene.add(stationModel);
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle de maison:', error);
});


let houseModel;
let mixer2;

loader.load('/images/house.glb', (gltf) => {
    houseModel = gltf.scene;
    houseModel.scale.set(1, 1, 1); // Redimensionner le modèle
    houseModel.position.set(-6.2, 0, 2); // Position initiale de la maison
    houseModel.rotation.y = Math.PI / 2; //rotation
    scene.add(houseModel);

    // Initialisation du mixer pour les animations
    mixer2 = new THREE.AnimationMixer(houseModel);

    gltf.animations.forEach((clip) => {
       const action = mixer2.clipAction(clip);
       action.setLoop(THREE.LoopRepeat, Infinity);
       action.timeScale = 0.1; // Ralentit l'animation
       action.play();
   });


    // Démarrer la première animation si disponible
    if (gltf.animations.length > 0) {
        const action = mixer2.clipAction(gltf.animations[0]);
        action.play();
    }
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle de maison:', error);
});






























/*

let treeClones = []; 

// Chargement du modèle GLTF de larbre
let treeModel;
loader.load('/images/tree.glb', (gltf) => {
    treeModel = gltf.scene;

    const positions = [
        { x: -5, y: 0, z: -2 },  // Position 1
        { x: -5, y: 0, z: -1 },   // Position 2
        { x: -5, y: 0, z: -1 },
        { x: -5, y: 0, z: 1 },  // Position 1
        { x: -5, y: 0, z: 1 },   // Position 2
        { x: -5, y: 0, z: 2 },    // Position 3
        { x: -5, y: 0, z: 3 },    // Position 4
        { x: -5, y: 0, z: 8 },   // Position 5
        { x: -5, y: 0, z: 10 }, //position 6
        { x: -5, y: 0, z: 12 },    // Position 7
        { x: -5, y: 0, z: 14 },   // Position 8
        { x: -5, y: 0, z: 16 },   // Position 9
        { x: -5, y: 0, z: 18 }, //position 6
        { x: -5, y: 0, z: 20 },    // Position 7
        { x: -5, y: 0, z: 22 },   // Position 8
        { x: -5, y: 0, z: 24 },   // Position 9
        { x: -5, y: 0, z: 26 }, //position 6
        { x: -5, y: 0, z: 28 },    // Position 7
        { x: -5, y: 0, z: 30 },   
        { x: -5, y: 0, z: 32 },   
        { x: -5, y: 0, z: 34 },   
        { x: -5, y: 0, z: 36 },   
        { x: -5, y: 0, z: 38 }, 
        { x: -5, y: 0, z: 40 },    
        { x: -5, y: 0, z: 42 },   
        { x: -5, y: 0, z: 44 },   
        { x: -5, y: 0, z: 46 },   
        { x: -5, y: 0, z: 48 }, 
        { x: -5, y: 0, z: 50 },    
        { x: -5, y: 0, z: 52 },   
        { x: -5, y: 0, z: 54 },   
        { x: -5, y: 0, z: 56 }, 
        { x: -5, y: 0, z: 58 },    
        { x: -5, y: 0, z: 60 },   
        { x: -5, y: 0, z: 62 },   
        { x: -5, y: 0, z: 64 },   
        { x: -5, y: 0, z: 66 },   
        { x: -5, y: 0, z: 68 }, 
        { x: -5, y: 0, z: 70 },    
        { x: -5, y: 0, z: 72 },   
        { x: -5, y: 0, z: 74 },
        { x: -5, y: 0, z: 76 },   
        { x: -5, y: 0, z: 78 },   
        { x: -5, y: 0, z: 80 },   
        { x: -5, y: 0, z: 82 },   
        { x: -5, y: 0, z: 84 }, 
        { x: -5, y: 0, z: 86 },    
        { x: -5, y: 0, z: 88 },   
        { x: -5, y: 0, z: 90 },
    ];
    
    // Dupliquer le modèle darbres et le positionner
    positions.forEach((pos) => {
        const treeClone = treeModel.clone(); // Cloner le modèle
        treeClone.scale.set(0.05, 0.05, 0.05);   // Ajuster la taille de l'herbe
        treeClone.position.set(pos.x, pos.y, pos.z); // Positionner selon les coordonnées définies
        scene.add(treeClone);
        treeClones.push(treeClone);
        
        
    });
}, undefined, (error) => {
    console.error('Erreur lors du chargement du modèle d\'herbe:', error);
});*/



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
    plane.position.set(index * 6 - 12, 5, -10); // Ajustez les positions
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
const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ 
    map: moonTexture,
    emissive: new THREE.Color(0xffffff), // Couleur émise (rouge sang)
    emissiveIntensity: 1, // Intensité de l'émission
    roughness: 0.9, // Aspect légèrement rugueux
    metalness: 0.9 // Faible aspect métallique
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// Positionner la lune derrière le modèle
moon.position.set(1, 10, -8);
scene.add(moon);

const moonLight = new THREE.PointLight(0x9999ff, 1, 100); // Lumière bleutée avec un rayon de 50
moonLight.position.set(1, 10, -10); // Positionner la lumière à la même position que la lune
scene.add(moonLight);

const textureLoaderC = new THREE.TextureLoader();
const imageTexture = textureLoaderC.load('/images/foret.png');  // Remplacez par le chemin de votre image

// Créer un plan pour afficher l'image
const imageGeometry = new THREE.PlaneGeometry(5, 5);  // Taille du plan ajustable
const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
const imagePlane = new THREE.Mesh(imageGeometry, imageMaterial);
imagePlane.position.set( -13, 3.8, -5); // Positionner l'image juste au-dessus du sol
scene.add(imagePlane);

const textureLoaderB = new THREE.TextureLoader();
const imageTextureB = textureLoaderB.load('/images/foret.png');  // Remplacez par le chemin de votre image

// Créer un plan pour afficher l'image
const imageGeometryB = new THREE.PlaneGeometry(5, 5);  // Taille du plan ajustable
const imageMaterialB = new THREE.MeshBasicMaterial({ map: imageTextureB, transparent: true });
const imagePlaneB= new THREE.Mesh(imageGeometryB, imageMaterialB);
imagePlaneB.position.set( -2, 5, -15); // Positionner l'image juste au-dessus du sol
scene.add(imagePlaneB);

function animateMoonLight() {
    moonLight.intensity = 1 + Math.sin(Date.now() * 0.001) * 0.1; // Variation douce de l'intensité
}


// Animation
function animate() {
    let speed = 0.05;
    requestAnimationFrame(animate);

    animateMoonLight();

    const delta = clock.getDelta();

    

    
 // Déplacer les clones d'herbe en même temps que le sol
 grassClones.forEach((clone) => {
    clone.position.z -= speed; 
    
    if (clone.position.z < -10) { 
        clone.position.z = 50; // Remettre l'herbe à la position de départ si elle dépasse 50
    }// Déplacer les modèles d'herbe dans la même direction que le sol
});

grassClones2.forEach((clone) => {
    clone.position.z -= speed; 
    
    if (clone.position.z < -10) { 
        clone.position.z = 50; // Remettre l'herbe à la position de départ si elle dépasse 50
    }// Déplacer les modèles d'herbe dans la même direction que le sol
});

/* Déplacer les clones darbres en même temps que le sol
treeClones.forEach((clone) => {
    clone.position.z -= speed; 
    
    if (clone.position.z < -10) { 
        clone.position.z = 50; // Remettre l'herbe à la position de départ si elle dépasse 50
    }// Déplacer les modèles d'herbe dans la même direction que le sol
});*/


if (homeModel) {
    homeModel.position.z -= speed; // Déplacement de la maison

    // Réinitialiser la position si elle dépasse les limites
    if (homeModel.position.z < -10) {
        homeModel.position.z = 50;
    }
}

if (homeModel2) {
    homeModel2.position.z -= speed; // Déplacement de la maison

    // Réinitialiser la position si elle dépasse les limites
    if (homeModel2.position.z < -10) {
        homeModel2.position.z = 50;
    }
}
if (slumModel) {
    slumModel.position.z -= speed; // Déplacement de la maison

    // Réinitialiser la position si elle dépasse les limites
    if (slumModel.position.z < -10) {
        slumModel.position.z = 50;
    }
}

if (stationModel) {
    stationModel.position.z -= speed; // Déplacement de la maison

    // Réinitialiser la position si elle dépasse les limites
    if (stationModel.position.z < -10) {
        stationModel.position.z = 50;
    }
}

if (houseModel) {
    houseModel.position.z -= speed; // Déplacement de la maison

    // Réinitialiser la position si elle dépasse les limites
    if (houseModel.position.z < -10) {
        houseModel.position.z = 50;
    }
}

    
    

    

    // Mettre à jour les animations si le mixer est défini
    if (mixer) {
        mixer.update(delta); // Avance les animations en fonction du temps écoulé
    }

    if (mixer2) {
        
        mixer2.update(delta); // Avance les animations en fonction du temps écoulé
    }

    if (mixer3) {
        
        mixer3.update(delta); // Avance les animations en fonction du temps écoulé
    }

    





    // Déplacer le modèle dans la direction de la marche 
    if (model) {
        model.position.z += speed - 0.05; // Faire avancer le modèle (déplace l'objet sur l'axe Z)
    }
    groundTexture.offset.y -= speed * 0.01;




















    /* Déplacer l'image le long de l'axe Z (ou X selon l'orientation du chemin)
    carModel.position.z += 0.1;
    carModel.position.z += 0.1;// Ajustez la vitesse du déplacement

  

    

    if (carModel.position.z > 50) {
        carModel.position.z = -50;
    }*/


    /* Déplacer la voiture sur la route
    if (carModel) {
        carModel.position.z -= speed; // Déplacement de la voiture

        // Réinitialiser la position si elle dépasse les limites
        if (carModel.position.z > 50) {
            carModel.position.z = -50;
        }
    }*/

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


