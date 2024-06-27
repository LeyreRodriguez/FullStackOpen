const Filter = ({filter, filterName}) => {
    return (
      <div>
        <div>
              filter shown with <input value = {filter} 
              onChange = {filterName} />          
          </div>
  
      </div>
    )
  }
  
  export default Filter