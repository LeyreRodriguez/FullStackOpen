import Part from "./Part"
import Total from "./Total"


const Content = ({parts}) => {

    const total = parts.reduce((accumulator,currentValue) => accumulator + currentValue.exercises,0);
    return (
      <div>

         {parts.map((part, index) => (
          <Part key={index} name={part.name} exercises={part.exercises} />
        ))} 

        <Total amount = {total} />
      </div>
    )
  }
export default Content