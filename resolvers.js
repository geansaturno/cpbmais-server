const Lesson = require('./models/Lesson')
const Meditations = require('./models/Meditations')
const { GraphQLScalarType, Kind } = require('graphql')
const meditations = require('./data/meditations')

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize (value) {
    return value.getTime()
  },
  parseValue (value) {
    return new Date(value)
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
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
    meditations: function () {
      return meditations
    },
    getLessons: function (_, { date }) {
      const dateSplited = date.split('/')
      if (dateSplited.length === 3) {
        const lessonDateStart = new Date(parseInt(dateSplited[2]), parseInt(dateSplited[1]) - 1, parseInt(dateSplited[0]))

        return Lesson.find({
          date: lessonDateStart
        })
      }
    },
    getReading: function () {
      return Meditations[0]
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
