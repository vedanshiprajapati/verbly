import { ReactNode, createContext } from "react"
type AuthProviderProps = {
    children: ReactNode
}
type AuthContextType = {

}
const AuthContext: React.Context<AuthContextType | null> = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {

    return (<AuthContext.Provider></AuthContext.Provider>)
}