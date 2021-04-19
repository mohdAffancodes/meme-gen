import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "./mg.css";

function MemeGenerator() {
   //Meme text
   const [topText, setTopText] = useState("");
   const [bottomText, setBottomText] = useState("");

   const [allMemes, setAllMemes] = useState([]); //Meme imgs Array

   const [meme, setMeme] = useState(""); //Meme

   //Meme img loading state
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("https://api.imgflip.com/get_memes")
         .then((res) => res.json())
         .then((res) => {
            //.console.log(res.data.memes[0]);
            setAllMemes(res.data.memes);
         });
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      const randNum = Math.floor(Math.random() * allMemes.length);
      const randomMemeImg = allMemes[randNum].url;
      //.setting the meme img
      setMeme(randomMemeImg);
      let loadImg = document.getElementById("load");
      loadImg.onload = () => {
         setLoading(false);
         document.querySelector(".meme").style.height =
            loadImg.offsetHeight + "px";
      };
   };

   const handleDownload = () => {
      let element = document.querySelector(".meme");

      html2canvas(element, {
         scrollX: -window.scrollX,
         scrollY: -window.scrollY,
         windowWidth: document.documentElement.offsetWidth,
         windowHeight: document.documentElement.offsetHeight,
         logging: true,
         letterRendering: 1,
         useCORS: true,
      }).then((canvas) => {
         var img = canvas.toDataURL();
         //window.open(img);
         downloadURL(img, "meme.png");
      });
   };

   function downloadURL(url, name) {
      let link = document.createElement("a");

      link.download = name;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
         link.remove();
      }, 500);
   }

   return (
      <div className="container">
         {allMemes.length !== 0 && (
            <form className="meme-form" onSubmit={handleSubmit}>
               <input
                  type="text"
                  name="topText"
                  placeholder="Top Text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
               />
               <input
                  type="text"
                  name="bottomText"
                  placeholder="Bottom Text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
               />

               <button>Gen</button>
            </form>
         )}
         <div className="meme">
            <img src={meme} alt="" id="load" />
            {!loading && (
               <>
                  <h2 className="top">{topText}</h2>
                  <h2 className="bottom">{bottomText}</h2>
               </>
            )}
         </div>
         {!loading && (
            <button onClick={handleDownload} className="download">
               Download
            </button>
         )}
      </div>
   );
}

export default MemeGenerator;
