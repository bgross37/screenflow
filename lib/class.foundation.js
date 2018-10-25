class Foundation{
    constructor(content, style, variables){
        this.content = content;
        this.style = style;
        this.variables = variables;
    }

    static findVariablesFromText(text){
        let currentVariable = "";
        let variables = [];
        for (var i = 0; i < text.length; i++) {
            //In the middle of Variable creation
            if(currentVariable != "" && text.charAt(i) != "}"){
                currentVariable += text.charAt(i);
            }
            //Finishing a Variable
            else if(currentVariable != "" && text.charAt(i) == "}"){
                currentVariable += text.charAt(i);
                variables.push(JSON.parse(currentVariable));
                currentVariable = "";
            }
            //Start a Variable
            else if(currentVariable == "" && text.charAt(i) == "{"){
                currentVariable = text.charAt(i);
            }
        }
        return variables;
    }

    static makeFoundationVariable(json){
        let variables = [];
        for (var i = 0; i < json.length; i++) {
            variables.push(new FoundationVariable(json[i]));
        }

        return variables;
    }

    /**
     * This is the parser that seperates html, css exludes variables that are needed
     * @param  {[type]} code [description]
     * @return {[type]}      [description]
     */
    static createFoundation(html, css){
        let variables = [];
        variables = this.findVariablesFromText(html);
        variables = variables.concat(this.findVariablesFromText(css));

        variables = this.makeFoundationVariable(variables);

        return new Foundation(html, css, variables);
    }
}

module.exports = Foundation;
