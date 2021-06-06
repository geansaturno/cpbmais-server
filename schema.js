const { gql } = require('apollo-server')

const schema = gql`
scalar Date

type Lesson {
    id: ID!
    day: String
    title: String!
    kicker: String
    content: String
    image: String
    verse: String
    date: Date
}

type Meditation {
    id: ID!
    title: String
    description: String
}

input LessonInputs {
    day: String
    title: String!
    kicker: String
    content: String
    image: String
    verse: String
    date: Date
}

type Query {
    lessons: [Lesson]!
    meditations: [Meditation]!
    getLessons(date: String): [Lesson]
}

type Mutation {
    createLesson(data: LessonInputs): Lesson
}

`

module.exports = schema
