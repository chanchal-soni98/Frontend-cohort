function isPalindrome(str){
   str = str.match(/[a-zA-Z]/g).join('').toLowerCase();
   let flag = true;
   let i=0;
   let j=str.length-1
   while(i<j){
    if(str[i]!=str[j]){
        flag = false;
        break;
    }else{
        i++;
        j--;
    }
   }
   console.log(flag)
}

isPalindrome("A man, a plan, a canal, Panama");