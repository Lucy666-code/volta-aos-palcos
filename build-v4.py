# Junta src/v4.css e src/v4.js dentro do index.html (entre os marcadores v4)
import re,io
p='index.html';s=open(p,encoding='utf-8').read()
css=open('src/v4.css',encoding='utf-8').read();js=open('src/v4.js',encoding='utf-8').read()
blk='<!--v4--><style id="v4css">\n'+css+'\n</style><script id="v4js">\n'+js+'\n</script><!--/v4-->'
if '<!--v4-->' in s: s=re.sub(r'<!--v4-->.*?<!--/v4-->',lambda m:blk,s,flags=re.S)
else:
    k='<script src="https://accounts.google.com/gsi/client"';assert k in s;s=s.replace(k,blk+'\n'+k,1)
open(p,'w',encoding='utf-8').write(s);print('ok',len(s))
