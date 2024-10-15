import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import * as React from 'react'
import styles from './Page.module.css'

type BuilderContent = React.ComponentProps<typeof BuilderComponent>['content']

export const Page: React.FC = () => {
    const isPreviewingInBuilder = useIsPreviewing()
    const [notFound, setNotFound] = React.useState(false)
    const [content, setContent] = React.useState<BuilderContent>()

    React.useEffect(() => {
        async function fetchContent(): Promise<void> {
            const content = await builder
                .get('page', {
                    url: window.location.pathname,
                })
                .promise()

            setContent(content)
            setNotFound(!content)

            // if the page title is found,
            // set the document title
            if (content?.data.title) {
                document.title = content.data.title
            }
        }

        fetchContent()
    }, [window.location.pathname])

    return (
        <div className={styles['container']}>
            <h1>Bizzkit Starter Kit</h1>
            {notFound && !isPreviewingInBuilder && <p>Not found</p>}
            {(!notFound || isPreviewingInBuilder) && (
                <BuilderComponent model='page' content={content} />
            )}
        </div>
    )
}
