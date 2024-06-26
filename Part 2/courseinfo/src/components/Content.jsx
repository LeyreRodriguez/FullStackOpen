import Part from "./Part"
import Total from "./Total"


const Content = ({parts}) => {

    let totalExercises = 0;
    parts.forEach(part => {
      totalExercises += part.exercises;
    });

    return (
      <div>

         {parts.map((part, index) => (
          <Part key={index} name={part.name} exercises={part.exercises} />
        ))} 

        <Total amount = {totalExercises} />
      </div>
    )
  }
export default Content