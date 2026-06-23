@echo off
title Piksel Duvari Deploy

cd /d E:\pixel-site

echo.
echo ==========================================
echo   Piksel Duvari - Otomatik Deploy
echo ==========================================
echo.

git status --short
echo.

git status --porcelain > "%TEMP%\gitcheck.txt"
set /p FIRST_LINE=<"%TEMP%\gitcheck.txt"
del "%TEMP%\gitcheck.txt"

if "%FIRST_LINE%"=="" (
    echo [!] Degisiklik yok, deploy yapilmadi.
    pause
    exit /b 0
)

set /p MSG=Commit mesaji gir:

if "%MSG%"=="" set MSG=Update

git add -A
git commit -m "%MSG%"

echo.
echo [*] GitHub push ediliyor...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================
    echo  BASARILI! Vercel deploy basliyor...
    echo  https://pikselduvari.vercel.app
    echo ==========================================
) else (
    echo [HATA] Push basarisiz!
)

echo.
pause
