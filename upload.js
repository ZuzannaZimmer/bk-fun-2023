

const firebaseConfig = {
    apiKey: "AIzaSyCYKEr2AlGePrUI0PdDb04Dv-Wd_hDQpP4",
    authDomain: "bk-fun-2023.firebaseapp.com",
    databaseURL: "https://bk-fun-2023-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bk-fun-2023",
    storageBucket: "bk-fun-2023.appspot.com",
    messagingSenderId: "374472844259",
    appId: "1:374472844259:web:e27b80e047a656174a36d6"
};

firebase.initializeApp(firebaseConfig);



var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img")
var description;
var descriptionInput = document.getElementById("text-input");

function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    var fileText = document.querySelector(".fileText");
    fileText.innerHTML = fileName;

    description = document.getElementById("text-input").value;
 }


 function uploadImage() {
    description = descriptionInput.value; // Pobranie opisu z inputa
    if (!description) {
        console.log("Opis jest pusty, nie można wysłać obrazu.");
        return;
    }

    let storageRef = firebase.storage().ref("images/" + fileName);
    let uploadTask = storageRef.put(fileItem, {
        customMetadata: {
            description: description
        }
    });


    uploadTask.on("state_changed", (snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.butesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal+"%";
        progress.style.width=percentVal+"%";

    },(error)=>{
        console.log("Error is", error);
    },()=>{

        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL", url);

            if(url !==""){
                img.setAttribute("src", url);
                img.style.display="block";
            }
            var statusText = document.querySelector(".statusText");
            statusText.textContent = "Wysłano!";
            console.log("Opis: ", description);
        })
        
    })

 }


 