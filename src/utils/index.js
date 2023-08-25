export function lcs(X, Y, count) {
    console.log('xx',X);
    let i = X.length;
    let j = Y.length;
    console.log('ii',i);
      
        if (i === 0 || j === 0) {
            return count;
        }
            
      
        if (X[i - 1] === Y[j - 1]) {
            count = lcs(i - 1, j - 1, count + 1);
        }
        count = Math.max(count,
                    Math.max(lcs(i, j - 1, 0),
                        lcs(i - 1, j, 0)));
        return count;
    }
