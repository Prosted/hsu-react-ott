import { Header } from "./Header"

export const HeaderTemplate = ({children}) => {
    return(
        <div>
            <Header />
            {children}  
        </div>
    )
}

