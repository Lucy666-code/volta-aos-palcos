# Junta src/v4.* e src/v5.* dentro do index.html (entre marcadores)
import re
p='index.html';s=open(p,encoding='utf-8').read()
k='<script src="https://accounts.google.com/gsi/client"';assert k in s
for v in ['v4','v5']:
    css=open('src/%s.css'%v,encoding='utf-8').read();js=open('src/%s.js'%v,encoding='utf-8').read()
    blk='<!--%s--><style id="%scss">\n'%(v,v)+css+'\n</style><script id="%sjs">\n'%v+js+'\n</script><!--/%s-->'%v
    if '<!--%s-->'%v in s: s=re.sub(r'<!--%s-->.*?<!--/%s-->'%(v,v),lambda m:blk,s,flags=re.S)
    else: s=s.replace(k,blk+'\n'+k,1)
open(p,'w',encoding='utf-8').write(s);print('ok',len(s))
