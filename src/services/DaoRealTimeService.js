import { realTime } from "@/firebase";
import { ref } from "firebase/database";

export class DaoRealTimeService{
    constructor(path){
        if(!path){
            throw new Error("Path is required");
        }
        this.collection = path;
        this.realDb = ref(realTime, path);
    }

    async create(data){
        try{
            await this.realDb.push(data);
        }catch(error){
            console.error("Error adding document: ", error);
        }
    }

    async update(id, data){
        try{
            await this.realDb.child(id).update(data);
        }catch(error){
            console.error("Error updating document: ", error);
        }
    }

    async delete(id){
        try{
            await this.realDb.child(id).remove();
        }catch(error){
            console.error("Error deleting document: ", error);
        }
    }

    async getAll(){
        try{
            const snapshot = await this.realDb.get();
            const data = [];
            snapshot.forEach((child) => {
                data.push({id: child.key, ...child.val()});
            });
            return data;
        }catch(error){
            console.error("Error getting documents: ", error);
        }
    }

    async get(id){
        try{
            const snapshot = await this.realDb.child(id).get();
            return snapshot.val();
        }catch(error){
            console.error("Error getting document: ", error);
        }
    }
    
}
