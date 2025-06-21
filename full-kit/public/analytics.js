(function(){
  function send(event){
    try{
      fetch('/api/analytics',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(event)
      });
    }catch(e){console.error('analytics error',e);}
  }
  send({type:'pageview',url:window.location.href,referrer:document.referrer});
  window.shadboardAnalytics={track:send};
})();
