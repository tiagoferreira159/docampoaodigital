
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Navbar shadow on scroll
const navBar = document.querySelector('.navbar');
window.addEventListener('scroll', ()=>{
  if(window.scrollY>8){ navBar.classList.add('scrolled'); }
  else { navBar.classList.remove('scrolled'); }
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const menu = document.getElementById('main-nav');
if(burger && menu){
  burger.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click (mobile)
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if(window.innerWidth<=980){
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      }
    });
  });
}

// Click-based dropdowns for all devices
(function(){
  const nav = document.getElementById('main-nav');
  if(!nav) return;
  const dropdowns = Array.from(nav.querySelectorAll('.dropdown'));
  function closeAll(except=null){ dropdowns.forEach(d=>{ if(d!==except) d.classList.remove('open'); }); }
  dropdowns.forEach(d=>{
    const btn = d.querySelector('.dropbtn');
    btn.setAttribute('aria-haspopup','true');
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const isOpen = d.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      closeAll(isOpen ? d : null);
    });
  });
  document.addEventListener('click', (e)=>{ if(!nav.contains(e.target)) closeAll(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeAll(); });
})();

// Active link highlight while scrolling
(function(){
  const links = Array.from(document.querySelectorAll('nav.nav a[href^="#"]'));
  const map = new Map();
  links.forEach(a=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) map.set(el, a);
  });
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const a = map.get(entry.target);
      if(!a) return;
      if(entry.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        a.classList.add('active');
        const dd = a.closest('.dropdown');
        document.querySelectorAll('.dropbtn').forEach(b=>b.classList.remove('active'));
        if(dd){ const btn = dd.querySelector('.dropbtn'); if(btn) btn.classList.add('active'); }
      }
    });
  }, {threshold:0.35});
  map.forEach((_, section)=>observer.observe(section));
})();

// v8: Send contact form to WhatsApp
(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = (document.getElementById('name')||{}).value || "";
    const email = (document.getElementById('email')||{}).value || "";
    const message = (document.getElementById('message')||{}).value || "";
    const text = `Olá! Tenho interesse no projeto Do Campo ao Digital.\n\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}`;
    const url = `https://wa.me/5585986926416?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
})();
