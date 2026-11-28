var V="vp-v36",F=["./","index.html","manifest.webmanifest","cdj-sheet0.jpg","cdj-sheet1.jpg","cdj-exploded.jpg","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(F.map(function(u){return new Request(u,{cache:"reload"})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
function put(req,res){if(res&&res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(req,cp)})}return res}
/* página: rede primeiro; se a rede demorar mais de 3 s (ou cair), usa a cópia salva */
function page(e,u){var nav=e.request.mode==="navigate";return new Promise(function(ok){var done=false,t=null;
 function fb(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||(nav?caches.match("index.html"):null)})}
 function end(r){if(done||!r)return false;done=true;clearTimeout(t);ok(r);return true}
 t=setTimeout(function(){fb().then(end)},3000);
 fetch(e.request,{cache:"no-cache"}).then(function(res){end(put(new Request(u.pathname),res))}).catch(function(){fb().then(function(r){if(!end(r)&&!done){done=true;clearTimeout(t);ok(Response.error())}})})})}
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;var u=new URL(e.request.url);if(u.origin!==location.origin)return;
 if(e.request.mode==="navigate"||/\/(index\.html)?$/.test(u.pathname)){e.respondWith(page(e,u));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request).then(function(res){return put(e.request,res)})}))});
