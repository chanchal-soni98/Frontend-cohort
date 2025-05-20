function reverseWords(str){
    let res = [];
    str = str.split(' ')
    for(let i=0;i<str.length;i++){
        let s = str[i];
        let revS = ''
        for(let j=s.length-1;j>=0;j--){
            revS+=s[j]
        }
        res.push(revS)
    }
    console.log(res.join(' '))
}
reverseWords("JavaScript is fun");