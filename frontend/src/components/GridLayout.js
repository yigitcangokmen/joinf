export const ParentGrid = ({ children, className = '' }) => {
    return (
        <div
          className={`container mx-auto max-w-screen-xl flex-grow ${className}`}
        >
            <div className="grid grid-cols-12 lg:gap-6">
              {children}
            </div>
        </div>
      )
}

export const GridSix = ({ children, className = '' }) => {
    return (
      <div className={`lg:col-span-6 md:col-span-12 col-span-12 ${className}`}>
        {children}
      </div>
    )
}