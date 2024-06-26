import Header from "./Header"
import Content from "./Content"

const Course = ({ courses }) => (
  <div>
    {courses.map((course, index) => (
        <div key={index}>
          <Header  name = {course.name} />
          <Content  parts = {course.parts} />
        </div>
    ))}

    
  </div>
    
    
  )

  export default Course