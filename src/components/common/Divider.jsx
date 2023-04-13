export const Divider = ({vertical=false}) => {

  return (
    <>
      <div className="flex flex-col w-full">
        {
          vertical ? <div className='divider-vertical'></div> : <div className="divider"></div>
        }
      </div>
    </>
  )
}