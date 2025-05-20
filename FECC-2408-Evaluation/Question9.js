
const files = [
  "document1.pdf",
  "document2.pdf",
  "image1.png",
  "image2.png",
  "text1.txt",
  "text2.txt",
  "photo1.jpg",
  "photo2.jpg",
  "program1.exe",
  "program2.exe",
  "data1.csv",
  "data2.csv",
  "report1.pdf",
  "report2.pdf",
  "image3.png",
  "text3.txt",
  "photo3.jpg",
  "document3.pdf"
];

function segregateFiles(files){

    const result = files.reduce((acc,curr)=> {
        if(acc[curr.slice(-3)]){
            acc[curr.slice(-3)].push(curr)
        }else{
            acc[curr.slice(-3)] = [curr]
        }
        return acc;
    },{})

}

console.log(segregateFiles(files))