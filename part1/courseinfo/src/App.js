const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = ({parts}) => {
  return parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, curr) => sum + curr.exercises, 0)

  return (
    <strong>total of {totalExercises} exercises</strong>
    )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'States',
        exercises: 11,
        id: 4
      },
      {
        name: 'CSS',
        exercises: 6,
        id: 5
      }
    ]
  }

  return (<Course course={course} />)
}

export default App