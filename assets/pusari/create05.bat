@echo off
setlocal
set "BASE64=iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+hHgAFgwJlphLZAAAAABJRU5ErkJggg=="
echo %BASE64% > "%TEMP%\b64.txt"
certutil -decode "%TEMP%\b64.txt" "05.jpg"
del "%TEMP%\b64.txt"
echo Created 05.jpg