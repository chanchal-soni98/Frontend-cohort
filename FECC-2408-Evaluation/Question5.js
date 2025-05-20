function mergeObjects(obj1,obj2){
    merge = {...obj1, ...obj2};
    return merge
}

const obj1 = { name: "John", age: 30 };
const obj2 = { age: 40, city: "New York" };

const result = mergeObjects(obj1, obj2);
console.log(result);
