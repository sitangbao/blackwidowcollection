const items = window.COLLECTION_ITEMS || [];
const categories = window.COLLECTION_CATEGORIES || [];
const $ = id => document.getElementById(id);
const search = $("search"), region = $("region-filter"), category = $("category-filter"), sort = $("sort-filter");
const catalog = $("catalog"), empty = $("empty-state"), dialog = $("item-dialog");

categories.forEach(c => category.add(new Option(c,c)));
const chips = $("category-chips");
const allChip = document.createElement("button");
allChip.className = "chip active"; allChip.textContent = "全部类别"; allChip.dataset.value = "全部"; chips.append(allChip);
categories.forEach(c => { const b=document.createElement("button"); b.className="chip"; b.textContent=c; b.dataset.value=c; chips.append(b); });

function safeText(value){return String(value ?? "").replace(/[&<>"']/g, ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function imageMarkup(item){
  if(item.image) return `<img src="${safeText(item.image)}" alt="${safeText(item.name)}" loading="lazy" onerror="this.remove();this.parentElement.innerHTML='<span class=&quot;placeholder&quot;>N°</span>'">`;
  return `<span class="placeholder">N°</span>`;
}
function filteredItems(){
  const q=search.value.trim().toLowerCase();
  let result=items.filter(i=>{
    const hay=[i.name,i.region,i.category,i.series,i.notes,i.year].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(region.value==="全部"||i.region===region.value)&&(category.value==="全部"||i.category===category.value);
  });
  if(sort.value==="name") result.sort((a,b)=>(a.name||"").localeCompare(b.name||""));
  if(sort.value==="year-new") result.sort((a,b)=>(b.year||"").localeCompare(a.year||""));
  if(sort.value==="year-old") result.sort((a,b)=>(a.year||"").localeCompare(b.year||""));
  return result;
}
function render(){
  const result=filteredItems();
  catalog.innerHTML=result.map((i,index)=>`<article class="item-card" tabindex="0" role="button" data-id="${safeText(i.id)}" aria-label="查看 ${safeText(i.name)}">
    <div class="item-image">${imageMarkup(i)}</div>
    <div class="item-label"><h3>${safeText(i.name)}</h3><div class="item-meta"><span class="tag">${safeText(i.region||"未分类")}</span><span>${safeText(i.category||"")}</span></div></div>
  </article>`).join("");
  $("total-count").textContent=items.length;
  $("region-count").textContent=new Set(items.map(i=>i.region).filter(Boolean)).size;
  $("category-count").textContent=new Set(items.map(i=>i.category).filter(Boolean)).size;
  $("result-count").textContent=`显示 ${result.length} 件藏品`;
  $("catalog-title").textContent=region.value==="全部"?"全部收藏":region.value+"收藏";
  empty.hidden=result.length!==0;
  catalog.hidden=result.length===0;
  chips.querySelectorAll(".chip").forEach(b=>b.classList.toggle("active",b.dataset.value===category.value));
}
function openItem(id){
  const i=items.find(x=>String(x.id)===String(id)); if(!i)return;
  $("dialog-image").src=i.image||"";
  $("dialog-image").alt=i.name||"";
  $("dialog-image").style.display=i.image?"block":"none";
  $("dialog-region").textContent=i.region||"未分类";
  $("dialog-name").textContent=i.name||"未命名藏品";
  $("dialog-category").textContent=i.category||"";
  const rows=[["发行年份",i.year],["系列",i.series],["原价",i.originalPrice],["入手价",i.paidPrice]].filter(x=>x[1]);
  $("dialog-details").innerHTML=rows.map(([k,v])=>`<div><dt>${safeText(k)}</dt><dd>${safeText(v)}</dd></div>`).join("");
  $("dialog-notes").textContent=i.notes||"";
  dialog.showModal();
}
catalog.addEventListener("click",e=>{const card=e.target.closest(".item-card");if(card)openItem(card.dataset.id);});
catalog.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("item-card")){e.preventDefault();openItem(e.target.dataset.id);}});
$("dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
[search,region,category,sort].forEach(el=>el.addEventListener("input",render));
chips.addEventListener("click",e=>{const b=e.target.closest(".chip");if(b){category.value=b.dataset.value;render();}});
$("reset-filters").addEventListener("click",()=>{search.value="";region.value="全部";category.value="全部";sort.value="default";render();});
render();
