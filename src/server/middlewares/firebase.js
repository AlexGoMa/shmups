const { initializeApp } = require("firebase/app");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const fs = require("fs");
const path = require("path");

const firebase = async (req, res, next) => {
  const { file } = req;
  const firebaseConfig = {
    apiKey: "AIzaSyCHAaD5z2btRqmCjMATCHc45RS8-G4MRK8",
    authDomain: "japan-things.firebaseapp.com",
    projectId: "japan-things",
    storageBucket: "japan-things.appspot.com",
    messagingSenderId: "1015922839755",
    appId: "1:1015922839755:web:09917e824b43e4243c4b4e",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const newImageName = file ? `${Date.now()}${file.originalname}` : "";

  if (file) {
    await fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newImageName),
      async (error) => {
        if (error) {
          next(error);
          return;
        }

        await fs.readFile(
          path.join("uploads", "images", newImageName),
          async (readError, readFile) => {
            if (readError) {
              next(readError);
              return;
            }

            const storage = getStorage(firebaseApp);

            const storageRef = ref(storage, newImageName);

            await uploadBytes(storageRef, readFile);

            const firebaseImageURL = await getDownloadURL(storageRef);

            req.imgBackup = firebaseImageURL;
            req.img = path.join(newImageName);

            next();
          }
        );
      }
    );
  } else {
    req.imgBackup = "";
    req.img = "";
    next();
  }
};

module.exports = firebase;
