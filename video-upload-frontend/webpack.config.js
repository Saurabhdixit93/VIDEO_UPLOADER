
module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /\//, to: "/404.html" }],
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
