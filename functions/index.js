const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise-native');
admin.initializeApp(functions.config().firebase);
const chatbot = (ref, data) => new Promise( resolve => {
  if(data && data.text && /写真/.test(data.text)){
    ref.push({
      name: "bot",
      imageUrl: 'http://lorempixel.com/640/480/nature/',
      photoUrl: '/images/omocha_robot.png'
    })
    setTimeout(()=> {
      resolve()
    },30*1000)
  }else{
    resolve()
  }
})
const delayRemove = ref => new Promise( resolve => {
  setTimeout(()=> {
    ref.remove()
    resolve();
  },30*1000);
})
exports.asyncAction = functions.database.ref('/messages/{id}').onWrite(event => {
  const data = event.data.val()
  return chatbot(event.data.ref.parent, data)
    .then(delayRemove(event.data.ref))
})