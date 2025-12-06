@echo off
cd C:\Users\güney\sui-freelancer-web

echo Removing git lock...
del .git\index.lock 2>nul

echo Configuring git...
git config user.email "guneykaraoz@hotmail.com"
git config user.name "guneyee"

echo Creating main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
