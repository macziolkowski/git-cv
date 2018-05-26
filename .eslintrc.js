module.exports = {
    extends: ["airbnb", "prettier"],
    plugins: ["prettier"],
    rules: {
        "react/prefer-stateless-function": [0, { ignorePureComponents: false }],
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                trailingComma: "all"
            }
        ],
        eqeqeq: ["error", "always"]
    }
};
