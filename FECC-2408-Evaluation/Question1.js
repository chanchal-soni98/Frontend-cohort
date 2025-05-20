function countVowelsAndConsonants(str){
    str = str.match(/[a-zA-Z]/g).join('').toLowerCase();
    let v = 0;
    let c = 0;
    for(let i=0;i<str.length;i++){
        if(str[i]=='a' || str[i]=='e' || str[i]=='i' || str[i]=='o' || str[i]=='u'){
            v++
        }else{
            c++
        }
    }
    console.log({'vowels': v, 'consonants': c})
}
countVowelsAndConsonants('Hello World!')