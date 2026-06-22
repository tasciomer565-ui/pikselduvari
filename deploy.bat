@echo off
echo Piksel Duvari Deploy Basliyor...
echo.

cd /d E:\pixel-site\frontend

echo [1/3] Vercel'e deploy ediliyor...
npx vercel --prod --yes

echo.
echo [2/3] Tamamlandi!
echo.
pause
