import{S as y,a as L,i}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const b=new y(".gallery a",{captionsData:"alt",captionDelay:250});function g(o,t){o.insertAdjacentHTML("beforeend",w(t)),b.refresh()}function w(o){return o.map(({webformatURL:t,largeImageURL:r,tags:a,likes:e,views:s,comments:l,downloads:f})=>`<li class="gallery-item">
            <a class="gallery-link" href="${r}">
              
                <img class="gallery-image" src="${t}" alt="${a}" width="360" />
               
                  <ul class="gallery-text">
                    <li>
                      <span>Likes</span>
                      <p>${e}</p>
                    </li>
                    <li>
                      <span>Views</span>
                      <p>${s}</p>
                    </li>
                    <li>
                      <span>Comments</span>
                      <p>${l}</p>
                    </li>
                    <li>
                      <span>Downloads</span>
                      <p>${f}</p>
                    </li>
                  </ul>

            </a>
          </li>`).join(" ")}const v="43344529-efab811219d9ae176ef45ef76",E="https://pixabay.com/api/";async function h(o,t){const a=`${E}?key=${v}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=15`;try{return(await L.get(a)).data.hits}catch(e){throw console.error("Error searching images:",e),new Error("Error searching images")}}const P=document.querySelector(".search-form"),u=document.querySelector(".gallery"),c=document.querySelector(".loader-wrapper"),n=document.querySelector(".btn-more");let d=1,S=15,m=null,p=null;n.addEventListener("click",I);P.addEventListener("submit",$);async function $(o){o.preventDefault(),u.innerHTML="",c.classList.remove("is-hidden"),d=1;const t=document.getElementById("input-text").value.trim();if(t!=="")try{const r=await h(t,d),a=r.hits;m=r.totalHits,p=Math.ceil(m/S),a.length>0?(g(u,a),n.classList.remove("is-hidden")):(i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),n.classList.add("is-hidden"))}catch(r){console.error("Error searching images:",r),i.error({title:"Error",message:"An error occurred while searching for images. Please try again later."})}finally{c.classList.add("is-hidden")}else i.error({title:"Error",message:"Please enter a search term"}),c.classList.add("is-hidden"),n.classList.add("is-hidden")}async function I(o){const t=document.getElementById("input-text").value.trim();if(d+=1,d<=p){c.classList.remove("is-hidden");try{const r=await h(t,d);if(r&&r.hits&&r.hits.length>0){const a=r.hits;g(u,a),q()}else i.info({title:"Info",message:"No more images available for this search term."}),n.classList.add("is-hidden")}catch(r){console.error("Error loading more images:",r),i.error({title:"Error",message:"An error occurred while loading more images. Please try again later."})}finally{c.classList.add("is-hidden")}}else i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),n.classList.add("is-hidden")}function q(){const o=u.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
