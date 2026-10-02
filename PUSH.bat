@echo off
title APNA BAZAR - GITHUB PUSH
color 0A
mode con: cols=75 lines=20
cd /d "C:\Users\MS-LPT\Desktop\Apna Bazar"

echo ===========================================================================
echo                 APNA BAZAR - AUTOMATIC GITHUB UPLOAD
echo ===========================================================================
echo.
echo  Code push ho raha hai...
echo.
echo  Agar browser mein ya samne popup aye, to:
echo  1. "Sign in with your browser" par click karein
echo  2. Browser mein "Authorize" ka green button daba dein
echo.
echo ===========================================================================
echo.

git branch -M main
git push -u origin main

echo.
echo ===========================================================================
if %errorlevel% equ 0 (
    echo  SUCCESS: Code kamyabi se GitHub par upload ho gaya hai!
    echo  Ab aap Netlify par ja kar Apna-Bazar select kar sakte hain.
) else (
    echo  Push complete nahi ho saka. Niche error check karein.
)
echo ===========================================================================
echo.
pause
