import{S as w,a as h,i}from"./assets/vendor-06b1bbdf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const S=new w(".gallery a",{captionsData:"alt",captionDelay:250});function f(s,t){s.innerHTML=E(t),S.refresh()}function E(s){return s.map(({webformatURL:t,largeImageURL:a,tags:o,likes:e,views:r,comments:l,downloads:v})=>`<li class="gallery-item">
            <a class="gallery-link" href="${a}">
              
                <img class="gallery-image" src="${t}" alt="${o}" width="360" />
               
                  <ul class="gallery-text">
                    <li>
                      <span>Likes</span>
                      <p>${e}</p>
                    </li>
                    <li>
                      <span>Views</span>
                      <p>${r}</p>
                    </li>
                    <li>
                      <span>Comments</span>
                      <p>${l}</p>
                    </li>
                    <li>
                      <span>Downloads</span>
                      <p>${v}</p>
                    </li>
                  </ul>

            </a>
          </li>`).join(" ")}const P=document.querySelector(".search-form"),m=document.querySelector(".gallery"),c=document.querySelector(".loader-wrapper"),n=document.querySelector(".btn-more"),y="43344529-efab811219d9ae176ef45ef76",L="https://pixabay.com/api/";let d=1,p=15,$=null,g=null,b=null,u=[];n.addEventListener("click",I);P.addEventListener("submit",q);async function q(s){s.preventDefault(),m.innerHTML="",c.classList.remove("is-hidden"),d=1,p=15;const t=document.getElementById("input-text").value.trim();if($=t,t!=="")try{const o=(await h.get(`${L}?key=${y}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${d}&per_page=${p}`)).data,e=o.hits;g=o.totalHits,b=Math.ceil(g/p),e.length>0?(u=e,f(m,u),n.classList.remove("is-hidden")):(i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),n.classList.add("is-hidden"))}catch(a){console.error("Error searching images:",a),i.error({title:"Error",message:"An error occurred while searching for images. Please try again later."})}finally{c.classList.add("is-hidden")}else i.error({title:"Error",message:"Please enter a search term"}),c.classList.add("is-hidden"),n.classList.add("is-hidden")}async function I(s){if(d+=1,d<=b){c.classList.remove("is-hidden");try{const a=(await h.get(`${L}?key=${y}&q=${$}&image_type=photo&orientation=horizontal&safesearch=true&page=${d}&per_page=${p}`)).data.hits;a.length>0?(u=[...u,...a],f(m,u),M()):(i.info({title:"Info",message:"No more images available for this search term."}),n.classList.add("is-hidden"))}catch(t){console.error("Error loading more images:",t),i.error({title:"Error",message:"An error occurred while loading more images. Please try again later."})}finally{c.classList.add("is-hidden")}}else i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),n.classList.add("is-hidden")}function M(){const s=m.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
