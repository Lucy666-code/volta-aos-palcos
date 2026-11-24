var V="vp-v17",F=["./","index.html","manifest.webmanifest","cdj-sheet0.jpg","cdj-sheet1.jpg","cdj-exploded.jpg","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(F.map(function(u){return new Request(u,{cache:"reload"})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
function put(req,res){if(res&&res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(req,cp)})}return res}
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;var u=new URL(e.request.url);if(u.origin!==location.origin)return;
 var page=e.request.mode==="navigate"||/\/(index\.html)?$/.test(u.pathname);
 if(page){e.respondWith(fetch(e.request,{cache:"no-cache"}).then(function(res){return put(new Request(u.pathname),res)}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match("index.html")})}));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request).then(function(res){return put(e.request,res)}).catch(function(){return caches.match("index.html")})}))});
