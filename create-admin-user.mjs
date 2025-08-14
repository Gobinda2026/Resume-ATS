
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    connectAuthEmulator
} from 'firebase/auth';
import {
    getFirestore,
    setDoc,
    doc,
    connectFirestoreEmulator
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDevelopment-Key-For-EmulatorsMkdGk",
    authDomain: "localhost",
    projectId: "ai-powered-ats",
};

async function createAdminUser() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

  
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);

    try {
        console.log('Creating admin user...');

        
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            'admin@example.com',
            'admin123'
        );

        const userId = userCredential.user.uid;
        console.log(`Created auth user with ID: ${userId}`);

        
        await setDoc(doc(db, 'users', userId), {
            id: userId,
            email: 'admin@example.com',
            role: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

createAdminUser().then(() => {
    console.log('Script completed');
    process.exit(0);
}).catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
}); 