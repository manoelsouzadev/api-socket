if(process.env.NODE_ENV == "production"){
	module.exports = { mongoURI: 'mongodb+srv://manoel:mongodbnosql@mongodb-akelj.mongodb.net/test?retryWrites=true&w=majority' }
}else{
  module.exports = { mongoURI: 'mongodb+srv://manoel:mongodbnosql@mongodb-akelj.mongodb.net/test?retryWrites=true&w=majority' }
}