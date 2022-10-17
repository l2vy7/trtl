@ECHO OFF
echo [32m -----[[37mTRTL BUILDER[32m]----- [37m
echo Welcome! Now building Trtl.
tsc
npx typedoc --tsconfig ./tsconfig.json --out ./docs ./ --name Trtl
echo "Done."