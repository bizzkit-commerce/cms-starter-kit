import { Divider } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Header } from '../Header'
import { Usp } from '../Usp'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Usp />
            <Header />
            <Divider />
            {children}
        </>
    )
}
