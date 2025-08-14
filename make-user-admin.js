
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/Firestore';
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

async function makeUserAdmin() {
    try {
        
        if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
            throw new Error('Missing required Firebase environment variables. Please check your .env file.');
        }

        
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        console.log('Connected to Firebase project:', firebaseConfig.projectId);

        
        const userEmail = 'edgarjobkerario@gmail.com'; 

        console.log(`Looking for user with email: ${userEmail}`);

       

        const userId = 'OnQAL2NDN1MV93BK2MfXTRjgdxw1'; 

        console.log(`Updating user ${userId} to admin role...`);

        
        const userDocRef = doc(db, 'users', userId);

        
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            console.log('User document not found. Creating new user document...');

            
            await setDoc(userDocRef, {
                id: userId,
                email: userEmail,
                role: 'admin',
                firstName: 'Edgar',
                lastName: 'Kerario',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            console.log('✅ New admin user document created!');
        } else {
            
            await updateDoc(userDocRef, {
                role: 'admin',
                updatedAt: new Date()
            });

            console.log('✅ User role updated to admin!');
        }

        console.log('🎉 Success! You are now an admin.');
        console.log('Please refresh your app to see admin features.');

    } catch (error) {
        console.error('❌ Error making user admin:', error);
        console.log('Make sure you:');
        console.log('1. Have the correct user ID');
        console.log('2. Are connected to the internet');
        console.log('3. Have proper Firebase permissions');
        console.log('4. Have all required environment variables in your .env file');
    }
}


makeUserAdmin(); 