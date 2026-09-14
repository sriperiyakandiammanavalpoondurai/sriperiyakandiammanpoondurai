/* Sri Periyakandiamman Temple — premium interactions (vanilla JS, efficient) */
(function(){
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- exact event data (same as original site, content unchanged) ---------- */
  var AMAVASAI = [
    {date:"17.04.2026",tamilDate:"சித்திரை - 04",weekday:"வெள்ளி",house:"சூரமங்கலம்"},
    {date:"16.05.2026",tamilDate:"வைகாசி - 02",weekday:"சனி",house:"வெள்ளமுத்துக்கவுண்டன் வலசு"},
    {date:"14.06.2026",tamilDate:"வைகாசி - 31",weekday:"ஞாயிறு",house:"P.K. வேலம்பாளையம் மேற்கு"},
    {date:"14.07.2026",tamilDate:"ஆனி - 30",weekday:"செவ்வாய்",house:"கனகபுரம்"},
    {date:"12.08.2026",tamilDate:"ஆடி - 27",weekday:"புதன்",house:"கோபி, ஏழூர்"},
    {date:"10.09.2026",tamilDate:"ஆவணி - 24",weekday:"வியாழன்",house:"கொடமாண்டப்பட்டி"},
    {date:"10.10.2026",tamilDate:"புரட்டாசி - 23",weekday:"சனி",house:"பவானி"},
    {date:"08.11.2026",tamilDate:"ஐப்பசி - 22",weekday:"ஞாயிறு",house:"தாதம்பட்டி"},
    {date:"08.12.2026",tamilDate:"கார்த்திகை - 22",weekday:"செவ்வாய்",house:"லக்காபுரம் புதூர்"},
    {date:"07.01.2027",tamilDate:"மார்கழி - 23",weekday:"வியாழன்",house:"நாமக்கல் ஏழூர்"},
    {date:"06.02.2027",tamilDate:"தை - 23",weekday:"சனி",house:"கூட்டாத்துப்பட்டி"},
    {date:"08.03.2027",tamilDate:"மாசி - 24",weekday:"திங்கள்",house:"சென்னிமலை"},
    {date:"06.04.2027",tamilDate:"பங்குனி - 23",weekday:"செவ்வாய்",house:"பெரியூர் மேற்கு"}
  ];
  var POURNAMI = [
    {date:"01.05.2026",tamilDate:"சித்திரை - 18",weekday:"வெள்ளி"},
    {date:"30.05.2026",tamilDate:"வைகாசி - 16",weekday:"சனி"},
    {date:"29.06.2026",tamilDate:"ஆனி - 15",weekday:"திங்கள்"},
    {date:"29.07.2026",tamilDate:"ஆடி - 13",weekday:"புதன்"},
    {date:"27.08.2026",tamilDate:"ஆவணி - 10",weekday:"வியாழன்"},
    {date:"26.09.2026",tamilDate:"புரட்டாசி - 09",weekday:"சனி"},
    {date:"25.10.2026",tamilDate:"ஐப்பசி - 08",weekday:"ஞாயிறு"},
    {date:"24.11.2026",tamilDate:"கார்த்திகை - 08",weekday:"செவ்வாய்"},
    {date:"23.12.2026",tamilDate:"மார்கழி - 08",weekday:"புதன்"},
    {date:"22.01.2027",tamilDate:"தை - 08",weekday:"வெள்ளி"},
    {date:"20.02.2027",tamilDate:"மாசி - 08",weekday:"சனி"},
    {date:"21.03.2027",tamilDate:"பங்குனி - 07",weekday:"ஞாயிறு"}
  ];
  var FESTIVAL = [
    {date:"01.02.2026",eventName:"கும்பாபிஷேக ஆண்டு விழா",tamilDate:"தை- 18",weekday:"ஞாயிறு"}
  ];
  function parseD(s){var p=s.split(".");return new Date(+p[2],+p[1]-1,+p[0]);}
  function upcoming(n){
    var now=new Date();now=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    var all=[];
    AMAVASAI.forEach(function(d){all.push({type:"amavasai",icon:"🌑",label:"அமாவாசை",dateStr:d.date,tamilDate:d.tamilDate,weekday:d.weekday,house:d.house,date:parseD(d.date)});});
    POURNAMI.forEach(function(d){all.push({type:"pournami",icon:"🌕",label:"பௌர்ணமி",dateStr:d.date,tamilDate:d.tamilDate,weekday:d.weekday,date:parseD(d.date)});});
    FESTIVAL.forEach(function(d){all.push({type:"festival",icon:"🎉",label:"திருவிழா",dateStr:d.date,eventName:d.eventName,tamilDate:d.tamilDate,weekday:d.weekday,date:parseD(d.date)});});
    return all.filter(function(e){return e.date>=now;}).sort(function(a,b){return a.date-b.date;}).slice(0,n||2);
  }

  /* ---------- header offset (fixed header + marquee) ---------- */
  function syncOffsets(){
    var strip=document.querySelector(".divine-strip");
    var header=document.querySelector("header");
    var marquee=document.querySelector(".temple-marquee");
    var sh=strip?strip.offsetHeight:30, hh=header?header.offsetHeight:78, mh=marquee?marquee.offsetHeight:44;
    document.documentElement.style.setProperty("--header-h",(sh+hh-30)+"px");
    // header is fixed at top:30, marquee below header
    if(header) header.style.top=sh+"px";
    if(marquee) marquee.style.top=(sh+header.offsetHeight)+"px";
    document.body.style.paddingTop=(sh+header.offsetHeight+marquee.offsetHeight)+"px";
  }

  /* ---------- marquee render ---------- */
  function renderMarquee(){
    var track=document.getElementById("marquee-track");
    if(!track) return;
    var evs=upcoming(2);
    if(!evs.length){
      track.innerHTML='<span class="marquee-item">🛕 அடுத்த விசேஷ நாட்களின் விவரங்கள் விரைவில் அறிவிக்கப்படும்.</span>';
      return;
    }
    function item(e){
      var h='<span class="marquee-item"><span class="marquee-label">'+e.icon+" "+e.label+'</span><span>'+e.dateStr+'</span>';
      if(e.eventName) h+='<span class="marquee-sep">|</span><span class="marquee-event-name">'+e.eventName+'</span>';
      if(e.tamilDate) h+='<span class="marquee-sep">|</span><span class="marquee-tamil-date">'+e.tamilDate+'</span>';
      if(e.weekday) h+='<span class="marquee-sep">|</span><span class="marquee-day">'+e.weekday+'</span>';
      if(e.house) h+='<span class="marquee-sep">|</span><span class="marquee-house">'+e.house+' கோவில் வீடு</span>';
      return h+'</span>';
    }
    var half='<span class="marquee-item marquee-lead">🛕 அடுத்த விசேஷ நாட்கள் :</span>'+evs.map(item).join("");
    track.innerHTML=half+half; // two copies for seamless loop
    requestAnimationFrame(function(){
      var w=track.scrollWidth/2, dur=Math.max(14,w/70);
      track.style.setProperty("--marquee-duration",dur+"s");
      syncOffsets();
    });
  }

  /* ---------- mobile menu ---------- */
  function initMenu(){
    var btn=document.getElementById("menu-btn"), list=document.getElementById("nav-links");
    if(!btn||!list) return;
    btn.addEventListener("click",function(e){e.stopPropagation();var open=list.classList.toggle("open");btn.setAttribute("aria-expanded",open?"true":"false");});
    document.addEventListener("click",function(e){if(list.classList.contains("open")&&!list.contains(e.target)&&e.target!==btn) list.classList.remove("open");});
    document.addEventListener("keydown",function(e){if(e.key==="Escape") list.classList.remove("open");});
    list.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){list.classList.remove("open");});});
  }

  /* ---------- active nav ---------- */
  function initActive(){
    var path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
    if(path==="" ) path="index.html";
    var map={"index.html":"index","history.html":"history","timings.html":"timings","admin.html":"admin","countries.html":"countries","gallery.html":"gallery","contact.html":"contact","kovil-veedu.html":"countries"};
    var cur=map[path]||"index";
    document.querySelectorAll("#nav-links a").forEach(function(a){
      if(a.getAttribute("data-page")===cur) a.classList.add("active");
    });
  }

  /* ---------- efficient 3D tilt (desktop only, rAF-throttled) ---------- */
  function initTilt(){
    if(!finePointer||prefersReduced) return;
    var cards=document.querySelectorAll("[data-tilt]");
    cards.forEach(function(card){
      var raf=null;
      function move(e){
        var r=card.getBoundingClientRect();
        var px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
        card.style.setProperty("--mx",(px*100)+"%");
        card.style.setProperty("--my",(py*100)+"%");
        if(raf) return;
        raf=requestAnimationFrame(function(){
          raf=null;
          var rx=((0.5-py)*10).toFixed(2), ry=((px-0.5)*12).toFixed(2);
          card.style.transform="perspective(1000px) rotateX("+rx+"deg) rotateY("+ry+"deg) translateY(-4px)";
        });
      }
      function leave(){if(raf){cancelAnimationFrame(raf);raf=null;}card.style.transform="";}
      card.addEventListener("pointermove",move,{passive:true});
      card.addEventListener("pointerleave",leave);
    });
  }

  /* ---------- scroll reveal (single observer, cheap) ---------- */
  function initReveal(){
    var els=document.querySelectorAll(".reveal, .g-item");
    if(!("IntersectionObserver" in window)||prefersReduced){els.forEach(function(el){el.classList.add("in","shown");});return;}
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add("in","shown");io.unobserve(en.target);}
      });
    },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    els.forEach(function(el){io.observe(el);});
  }

  /* ---------- hero parallax (rAF on scroll) ---------- */
  function initParallax(){
    var bg=document.querySelector(".hero-bg");
    if(!bg||prefersReduced) return;
    var ticking=false;
    function update(){
      ticking=false;
      var y=window.scrollY;
      if(y<window.innerHeight*1.2) bg.style.transform="translate3d(0,"+(y*0.22)+"px,0)";
    }
    window.addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  }

  /* ---------- sacred particle canvas (diya sparks, capped + pausable) ---------- */
  function initParticles(){
    var cv=document.getElementById("diya-canvas");
    if(!cv||prefersReduced) return;
    var ctx=cv.getContext("2d"), W,H,parts=[],running=true;
    var COUNT=window.innerWidth<640?22:44;
    function resize(){
      var r=cv.parentElement.getBoundingClientRect();
      W=cv.width=Math.floor(r.width);H=cv.height=Math.floor(r.height);
    }
    function spawn(i){
      return {x:Math.random()*W,y:H*0.35+Math.random()*H*0.65,r:1+Math.random()*2.6,s:0.25+Math.random()*0.7,o:Math.random()*Math.PI*2,gold:Math.random()>0.3};
    }
    function init(){resize();parts=[];for(var i=0;i<COUNT;i++)parts.push(spawn(i));}
    function frame(){
      if(!running){requestAnimationFrame(frame);return;}
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<parts.length;i++){
        var p=parts[i];
        p.y-=p.s;p.o+=0.02;p.x+=Math.sin(p.o)*0.3;
        if(p.y<-10){parts[i]=spawn(i);continue;}
        var tw=0.55+0.45*Math.sin(p.o*2);
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.gold?("rgba(245,214,123,"+(0.75*tw)+")"):("rgba(255,150,60,"+(0.7*tw)+")");
        ctx.shadowColor=p.gold?"rgba(212,175,55,.9)":"rgba(255,120,30,.9)";
        ctx.shadowBlur=10;
        ctx.fill();ctx.shadowBlur=0;
      }
      requestAnimationFrame(frame);
    }
    init();frame();
    window.addEventListener("resize",function(){init();},{passive:true});
    document.addEventListener("visibilitychange",function(){running=!document.hidden;});
  }

  /* ---------- pooja tabs ---------- */
  function initTabs(){
    var tabs=document.querySelectorAll(".pooja-tab");
    if(!tabs.length) return;
    tabs.forEach(function(btn){
      btn.addEventListener("click",function(){
        var key=btn.getAttribute("data-tab");
        tabs.forEach(function(b){b.classList.toggle("active",b===btn);b.setAttribute("aria-selected",b===btn?"true":"false");});
        document.querySelectorAll(".pooja-pane").forEach(function(p){p.classList.toggle("active",p.getAttribute("data-pane")===key);});
      });
    });
  }

  /* ---------- gallery lightbox ---------- */
  function initLightbox(){
    var items=Array.prototype.slice.call(document.querySelectorAll(".g-item"));
    var box=document.getElementById("lightbox");
    if(!items.length||!box) return;
    var img=box.querySelector("img"), cap=box.querySelector("figcaption"), idx=0;
    function show(i){
      idx=(i+items.length)%items.length;
      var im=items[idx].querySelector("img");
      img.src=im.src;img.alt=im.alt;
      cap.textContent=im.alt||"";
    }
    items.forEach(function(it,i){it.addEventListener("click",function(){box.classList.add("open");document.body.style.overflow="hidden";show(i);});});
    box.querySelector(".lb-close").addEventListener("click",close);
    box.querySelector(".lb-prev").addEventListener("click",function(e){e.stopPropagation();show(idx-1);});
    box.querySelector(".lb-next").addEventListener("click",function(e){e.stopPropagation();show(idx+1);});
    box.addEventListener("click",function(e){if(e.target===box) close();});
    document.addEventListener("keydown",function(e){
      if(!box.classList.contains("open")) return;
      if(e.key==="Escape") close();
      if(e.key==="ArrowLeft") show(idx-1);
      if(e.key==="ArrowRight") show(idx+1);
    });
    function close(){box.classList.remove("open");document.body.style.overflow="";}
  }

  /* ---------- image fade-in (efficient, no layout shift) ---------- */
  function initImgFade(){
    var imgs=document.querySelectorAll("img.fade");
    function ok(im){im.classList.add("ok");}
    if("IntersectionObserver" in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){ok(en.target);io.unobserve(en.target);}});},{rootMargin:"120px"});
      imgs.forEach(function(im){if(im.complete&&im.naturalWidth) ok(im);else{io.observe(im);im.addEventListener("load",function(){ok(im);},{once:true});}});
    }else{imgs.forEach(ok);}
  }

  /* ---------- back to top + year ---------- */
  function initMisc(){
    var top=document.getElementById("toTop");
    if(top){
      window.addEventListener("scroll",function(){top.classList.toggle("show",window.scrollY>600);},{passive:true});
      top.addEventListener("click",function(){window.scrollTo({top:0,behavior:prefersReduced?"auto":"smooth"});});
    }
    var y=document.getElementById("year");if(y) y.textContent=new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded",function(){
    renderMarquee();syncOffsets();initMenu();initActive();initTilt();
    initReveal();initParallax();initParticles();initTabs();initLightbox();initImgFade();initMisc();
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(syncOffsets);
    window.addEventListener("resize",syncOffsets,{passive:true});
    window.addEventListener("load",syncOffsets);
  });
})();
