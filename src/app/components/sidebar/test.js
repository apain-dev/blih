function test(){
  return new Promise((resolve, reject) => {
    resolve("coucou");
  });
}

function testThrow (){
  return new Promise((resolve, reject) => {
    reject("coucou");
  });
}

test().then(name => {
  test().then( name => {
    testThrow().then(answer => {

    }).catch(answer => {
      console.log("Error: " +answer);
    });
  });
}).catch(answer => {
  console.log("Error: " +answer);
});
