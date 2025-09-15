const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Example: get all patients
exports.getPatients = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("patients").get();
    let patients = [];
    snapshot.forEach(doc => patients.push({id: doc.id, ...doc.data()}));
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
