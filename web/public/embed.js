(function(){
  var d=document; var s=d.createElement('script');
  function inject(){
    var iframe=d.createElement('iframe');
    iframe.src=(window.EMBED_BOOK_URL|| (location.origin+'/book'));
    iframe.style.width='100%'; iframe.style.minHeight='420px'; iframe.style.border='1px solid #ccc'; iframe.style.borderRadius='8px';
    var t=d.getElementById('taxi-book-widget'); if(!t){ t=d.body; }
    t.appendChild(iframe);
  }
  if(document.readyState==='loading') d.addEventListener('DOMContentLoaded',inject); else inject();
})();
