import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
const usersCollection = collection(db, "users");

export class UserRepository {
  async findUserByEmail(email: string) {
    try {
      
      const q = query(usersCollection, where("email", "==", email));
      
      const data = await getDocs(q);

      if (data.empty) {
        console.log("User not found");
        return null;
      }

      const userDoc = data.docs[0];
      const user = { id: userDoc.id, ...userDoc.data() };

      return user;
    } catch (error) {
      return []
    }
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      const data = await getDocs(usersCollection);

      const users: User[] = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as User);

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  async updateUser(id: string, data: object) {
    try {
      const cleanData = Object.entries(data)
        .filter(([_, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      if (Object.keys(cleanData).length === 0) {
        throw new Error('No valid data provided for update');
      }

      const userDocRef = doc(db, "users", id);
      
      await updateDoc(userDocRef, {
        ...cleanData,
      });

      const updatedUserDoc = await getDoc(userDocRef);
      
      return {
        id: updatedUserDoc.id,
        ...updatedUserDoc.data()
      } as User;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}
