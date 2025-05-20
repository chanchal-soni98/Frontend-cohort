function deepCopy(obj){

    let obj1 = JSON.parse(JSON.stringify(obj));
    console.log(obj1)

}

const obj = {
  name: "John",
  address: {
    city: "New York",
    zip: 10001
  }
};

deepCopy(obj);