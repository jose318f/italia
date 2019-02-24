let retter = [];
        let filter = "alle";

        document.addEventListener("DOMContentLoaded", start);

        function start() {
            let dest = document.querySelector("#liste");

            async function getJson() {
                let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1LUVmEroU2us7PMRm6UoMgNzwnWW3Z3flnhRu4TrBkmo");
                retter = await jsonData.json();
                visRetter();

            }

            function visRetter() {
                dest.innerHTML = "";
                retter.forEach((ret) => {
                    if (filter == "alle" || filter == ret.kategori) {

let template= `

<article class="retter">
<img src = ${ret.billede}>
<h2>${ret.navn} </h2>
<h3>${ret.pris},-</h3>
</article>`;


                        dest.insertAdjacentHTML("beforeend", template);
                        dest.lastElementChild.addEventListener("click", åbn);

                        function åbn(){

                            document.querySelector("#indhold").innerHTML= `

                            <article class="retter">
<img src = ${ret.billede}>
<h2>${ret.navn} </h2>
<h3>${ret.pris},-</h3>
<p>${ret.tekst}</p>
</article>`;

   document.querySelector("#popup").style.display="block";


                        }


                    }
                })
            }

            document.querySelector("#luk button").addEventListener("click", ()=>{
                document.querySelector("#popup").style.display="none";
            })

            document.querySelectorAll(".filter").forEach(elm => {
                elm.addEventListener("click", filtrering);
            })

            function filtrering() {
                filter = this.getAttribute("data-kategori");
                document.querySelector("h1").textContent=this.textContent;
                document.querySelectorAll(".filter").forEach(elm =>{
                    elm.classList.remove("valgt");
                })
                this.classList.add("valgt");
                visRetter();
            }

            getJson();
        }
