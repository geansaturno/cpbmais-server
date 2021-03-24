const Lesson = require('./models/Lesson')
const { GraphQLScalarType, Kind } = require('graphql')

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize (value) {
    return value.getTime() // Convert outgoing Date to integer for JSON
  },
  parseValue (value) {
    return new Date(value) // Convert incoming integer to Date
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }
    return null // Invalid hard-coded value (not an integer)
  }
})

const resolvers = {
  Date: dateScalar,
  Query: {
    lessons: function () {
      try {
        return Lesson.find()
      } catch (error) {
        console.error(error)
        return null
      }
    },
    getLessons: function (_, { date }) {
      const dateSplited = date.split('/')
      if (dateSplited.length === 3) {
        const lessonDateStart = new Date(parseInt(dateSplited[2]), parseInt(dateSplited[1]) - 1, parseInt(dateSplited[0]))

        return Lesson.find({
          date: lessonDateStart
        })
      }
    }
  },
  Mutation: {
    createLesson: function (_, { data: lesson }) {
      console.log('Lesson', lesson)
      return new Lesson(lesson).save()
    }
  }
}

module.exports = resolvers
