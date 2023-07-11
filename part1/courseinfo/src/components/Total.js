const Total = (props) => {
    const totalExercises = props.parts.reduce((sum, curr) => sum + curr.exercises, 0)
  
    return (
      <strong>total of {totalExercises} exercises</strong>
      )
}

export default Total