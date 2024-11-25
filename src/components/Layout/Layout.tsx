import { Divider } from '@mui/material'
import { Header } from '../Header'
import { Page } from '../Page'
import { Usp } from '../Usp'

export const Layout: React.FC = () => {
    return (
        <>
            <Usp />
            <Header />
            <Divider />
            <Page />
        </>
    )
}
