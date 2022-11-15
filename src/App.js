import './App.css';
//import meta from '/test/meta.txt';
import React,{useState} from "react";
//import {Howl} from 'howler'


function App() {


  var  preArray = new Array([]);

  //var nameArray = new Array([]);

  var waitx = false;

  const [showaudio, setShowaudio] = useState(false)

  const [wo,  setWo] = useState("");

  const [buList, setBuList] = useState(new Array([]));

  const [curaudio, setCuraudio] = useState("");

  const [showButton, setShowButton] = useState(true);

  var currenter;

  fetch("/test/meta.txt")
  .then(r => r.text())
  .then(text => {
  preArray = text.split("\n");
  });
  var nameArray
  fetch("/test/metaName.txt")
  .then(r => r.text())
  .then(namen => {
    nameArray = namen.split("\n");
    console.log(nameArray.length);
  });

  

  //function playAudio(audio){
   // return new Promise(res=>{
    //  audio.play();
    //  audio.onended = res;
    //})
  //}

  var storyTree

  async function startReadMeta(){

  fetch("/test/meta.txt")
  .then(r => r.text())
  .then(text => {
  preArray = text.split("\n");
  //console.log(preArray);
  //console.log(preArray.length)
  });
  
  setShowButton(false);
  
  storyTree = new LinkedList();

  for(let i = 0; i < preArray.length; i++){
    var  tempa1 = preArray[i].split("-")[0];
    var  tempa2 = preArray[i].split("-")[1];
    var  tempa21 = tempa2.split("\r")[0];

    var tempa22 = tempa21.split(",");

    storyTree.insertLast(tempa1,tempa22);
    
    //preArray[i]
  }
  //console.log(storyTree);
  chosenr(1);

}

async function chosenr(number){
  
  
  currenter = storyTree.llgoto(number);
  setBuList([]);
  //console.log(number)
  //console.log(currenter)
  setWo(nameArray[number-1]);
  setShowaudio(true)
  
  //var audio = new Audio(window.location.href+'/test/'+number+'.mp3')
  setCuraudio(window.location.href+'/test/'+number+'.mp3');

  await delay(0.005);


  var aud = document.getElementById("myAudio");
  aud.onended = function() {
    setShowaudio(false)
    if(storyTree.llgoto(number) === null){
      setWo("Ende");
      return;
    }
  
    const bu = currenter.folger;
    console.log(bu)
    setBuList(bu.map(bu => <button className="chosebutton" key= {bu} onClick = {()=> chosenr(parseInt(bu)) }>{nameArray[bu-1]}</button>));
  };
  //await playAudio(curaudio)


  

  //currenter = llgoto();

}

function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}


  class Node {
    constructor(nr,follower,next = null){
      
      this.nr = nr;
      this.folger = follower;
      this.next = next;
    }
  }
 
  class LinkedList{
    constructor(){
      this.head = null;
      this.size = 0;
    }
    //insert first node

    llgoto(nummer){
      
      let current = this.head;
      console.log(current.folger);
      while(current != null){
        if(parseInt(current.nr) === parseInt(nummer)){
          return(current);
        }
        current = current.next;
      }
      return(null);

    }

    insertLast(data,follower){
      let node = new Node(data,follower);
      let current;

      if(this.head == null){
        this.head = node;
      }
      else{
        current = this.head;
     
      while(current.next != null){
        current = current.next;
      }
      current.next = node;
    }
    this.size+=1;
    }
  }


//const ll = new LinkedList();
//ll.insertFirst(100,[2,4])
//ll.insertFirst(200,[3,5])
//ll.insertLast(300,[3,3])
//console.log(ll);


  
  return (
    <div>
      <div class="navbar">
        <h1 class="nat">Interaktives Hörspiel</h1>
      </div>
      <div class="Tirteltext">
      <h3 class="nat">1000 Gefahren auf der Suche nach atlantis</h3>
      </div>
      
      <div class="dcover">
        <img className="cover" src = {window.location.href+"/test/titelbild.jpg"}/>
      </div>
      

      { showButton && <button className="startbutton" onClick={()=>startReadMeta()} >Start</button> }
      <div onLoad= {()=> this.startReadMeta() }></div>   
      
      {
        showaudio?<audio id="myAudio" controls>
        <source src= {curaudio} type="audio/mpeg"></source>
        </audio>:null
      }

      <div class="chosebuttonpos">
      { 
        buList   
      }
      </div>
      
      
    </div>
  );
}
//<h3>du hast: "{wo}" gewählt</h3>
export default App;
