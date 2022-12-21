@echo off
echo [32m -----[[37mTRTL BUILDER[32m]----- [37m
echo Welcome! Now building Trtl.
tsc
npx typedoc --tsconfig ./tsconfig.json --out ./docs ./src --name Trtl
echo "Done."
@echo on