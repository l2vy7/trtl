@ECHO OFF
echo [32m -----[[37mTRTL BUILDER[32m]----- [37m
echo Welcome! Now building Trtl.
tsc
<<<<<<< HEAD
npx typedoc --tsconfig ./tsconfig.json --out ./docs ./src --name Trtl
=======
npx typedoc --tsconfig ./tsconfig.json --out ./docs ./ --name Trtl
>>>>>>> bf9c64f593c5e93d9eb78feb5801aaaa6cd643e0
echo "Done."