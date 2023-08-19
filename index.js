import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { collection, onSnapshot,addDoc, getFirestore, getDocs, deleteDoc, doc,query,where,updateDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, ref, uploadBytes,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




const firebaseConfig = {
    apiKey: "AIzaSyBTJjHPGyoKux9djre6sY9ANacWlzl-O_o",
    authDomain: "website-ea2fa.firebaseapp.com",
    projectId: "website-ea2fa",
    storageBucket: "website-ea2fa.appspot.com",
    messagingSenderId: "686982922686",
    appId: "1:686982922686:web:0f6ecb466dca285ba0f9ef"
  };

  
// var myName  ;
// var myEmail  ;
// var myId  ;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);


        const q = collection(db, "nahyan")
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {

        document.getElementById("change").innerHTML = 
        `
        <a>${change.doc.data().firstName}</a>
        <a onclick="out()">Logout</a>
        `
          
          });
        });


        function out(){

            const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  window.location.href = "./index.html"
}).catch((error) => {
  // An error happened.
});
        }
        window.out = out



        const publish = document.getElementById("published")
publish.addEventListener('click',async()=>{

const postName = document.getElementById("postname").value;
const postArea = document.getElementById("postArea").value;

try {
  const docRef = await addDoc(collection(db, "nahyan"), {
   Postname : postName,
   Postarea : postArea
  });
  location.reload()
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}





        })
        const querySnapshot = await getDocs(collection(db, "nahyan"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById("show").innerHTML +=`
        
        <div class="container shadow p-3 mb-5 bg-body rounded" id="maincontainer" >
        <div class="row">
            <div class="col-lg-2">
                <img src="" id="myimg" style="border-radius: 10px;" width="120px"  alt="">
            </div>
            <div class="col-lg-2">
        
            </div>
            <div class="col-lg-8">
        <h4>${doc.data().Postname}</h4>
        <p style="font-size: small;">Nahyan Hussain</p>
            </div>
        </div>
        
        <p style="font-size: small;">${doc.data().Postarea}</p>
        <br>
        <div class="row">
            <div class="col-lg-2">
                <p onclick="del('${doc.id}')" style="color: blue;">
                    Delete
                </p>
            </div>
            <div class="col-lg-2">
                <p onclick="edit('${doc.id}')" style="color: blue;">
                    Edit
                </p>
            </div>
        </div>
        </div>
        
        `
        
        
        
        })

        async function del(id) {
            await deleteDoc(doc(db, "nahyan", id));
            location.reload()
          } 
          window.del = del





    
    getDownloadURL(ref(storage, 'nahyan'))
    .then((url) => {
        
        console.log(url);
        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
    })
    .catch((error) => {
        // Handle any errors
        console.log(error);
    });



    async function edit(id){
        const text = prompt("enter edit text")
        const ttext = prompt("enter edit text")
        const washingtonRef = doc(db, "nahyan", id);
    
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          Postname : text,
          Postarea : ttext,
        });
    window.location.reload();
    }
    
    window.edit = edit;
