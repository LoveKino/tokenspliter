/**
 * token
 *     type
 *     lexicon
 *
 * token_class <array>
 *           type
 *           regular
 */
let fetchToken = (token_class, txt) => {
    let matches = getMatchs(token_class, txt);
    if (matches.length === 0) {
        throw new Error("unExpected token for at the head of " + txt);
    }
    // max match principle
    let token = {
        lexicon: ""
    };
    for (let i = 0; i < matches.length; i++) {
        // > not >=, because the list first principle
        if (matches[i].lexicon.length > token.lexicon.length) {
            token = matches[i];
        }
    }
    return {
        token,
        next: txt.substring(token.lexicon.length)
    }
};
let getMatchs = (token_class, txt) => {
    let matches = [];
    for (let i = 0; i < token_class.length; i++) {
        let item = token_class[i];
        let type = item.type;
        let regular = item.regular;
        let arr = regular.exec(txt);
        if (arr && arr.index === 0) {
            matches.push({
                type,
                lexicon: arr[0]
            });
        }
    }
    return matches;
};

let validate = (token_class) => {
    if (!isArray(token_class)) {
        throw new TypeError("Expect array. " + token_class);
    }
    for (let i = 0; i < token_class.length; i++) {
        let item = token_class[i];
        if (!item || typeof item !== "object") {
            throw new TypeError("Expect object. " + item);
        }
        if (!item.type || typeof item.type !== "string") {
            throw new TypeError("Expect string. " + item.type);
        }
        if (!item.regular || !item.regular instanceof RegExp) {
            throw new TypeError("Expect regular. " + item.regular);
        }
    }
}

let isArray = v => v && typeof v === "object" &&
    typeof v.length === "number";

export default (token_class) => {

    validate(token_class);

    return (txt) => {
        let next = () => {
            if (!txt) return null;
            let arr = fetchToken(token_class, txt);
            txt = arr.next;
            return arr.token;
        }
        let lookAhead = () => {
            if (!txt) return null;
            let arr = fetchToken(token_class, txt);
            return arr.token;
        }
        let lookAheads = (steps = 1, filter) => {
            let source = txt;
            let results = [];
            for(let i = 0; i < steps; i++){
                if (!source) return results;
                let arr = fetchToken(token_class, source);
                source = arr.next;
                if(typeof filter === "function"){
                    if(filter(arr.token)){
                        results.push(arr.token);
                    } else{
                      i--;
                    }
                } else{
                    results.push(arr.token);
                }
            }
            return results;
        }
        let isEmpty = () => {
            if (!txt) return true;
            return false;
        }
        return {
            next,
            isEmpty,
            lookAhead,
            lookAheads
        }
    }
};
