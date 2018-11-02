const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")
const express = require("express")

admin.initializeApp();
const database = admin.database();
/* Express with CORS */
const app = express()
app.use(cors({
    origin: true
}))

app.get("*", (request, response) => {
    response.send("ERROR: Please send a post request")
})
app.post("*", (request, response) => {
    console.log(request.body);
    const day = +request.body.day;
    const students = +request.body.students;
    const ref = database.ref('gmt');

    return ref.on('value', snap => {
        const db = snap.val();
        console.log(db);
        // `db` contains all the values
        // WRITE YOUR CODE HERE




        // SEND THE RESPONSE HERE
        return response.send(`${JSON.stringify(db)}`);
    })

})
exports.gmt = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`
    }
    return app(request, response)
})