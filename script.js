document.body.classList.add('is-loading');
const loader=document.querySelector('.loader');
window.addEventListener('load',()=>{setTimeout(()=>{loader.classList.add('done');document.body.classList.remove('is-loading');},850);});
document.getElementById('year').textContent=new Date().getFullYear();

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}});},{threshold:.12,rootMargin:'0px 0px -35px 0px'});
 revealItems.forEach(item=>observer.observe(item));
}else{revealItems.forEach(item=>item.classList.add('visible'));}

const toggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');mobileMenu.classList.remove('open');mobileMenu.setAttribute('aria-hidden','true');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');mobileMenu.classList.toggle('open',open);mobileMenu.setAttribute('aria-hidden',String(!open));});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));

const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.image;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();closeMenu();}});

const cursor=document.querySelector('.cursor');
if(window.matchMedia('(pointer:fine)').matches){
 let x=0,y=0,tx=0,ty=0;
 window.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;cursor.style.opacity='1';});
 function moveCursor(){x+=(tx-x)*.22;y+=(ty-y)*.22;cursor.style.left=x+'px';cursor.style.top=y+'px';requestAnimationFrame(moveCursor);}moveCursor();
 document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='34px';cursor.style.height='34px';});el.addEventListener('mouseleave',()=>{cursor.style.width='12px';cursor.style.height='12px';});});
}

document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{if(!window.matchMedia('(pointer:fine)').matches)return;const r=el.getBoundingClientRect();const dx=(e.clientX-r.left-r.width/2)*.12;const dy=(e.clientY-r.top-r.height/2)*.12;el.style.transform='translate('+dx+'px,'+dy+'px)';});el.addEventListener('mouseleave',()=>{el.style.transform='';});});

// Demo shopping bag: interaction only; no payment or checkout.
let demoBagCount=0;const bagCount=document.querySelector('.bag-count');const bagStatus=document.querySelector('.bag-status');document.querySelectorAll('.add-to-bag').forEach(button=>button.addEventListener('click',()=>{demoBagCount++;if(bagCount)bagCount.textContent=String(demoBagCount);const original=button.innerHTML;button.innerHTML='ADDED TO BAG ✓';button.classList.add('added');setTimeout(()=>{button.innerHTML=original;button.classList.remove('added');},1100);}));
