import { BuilderContent } from '@builder.io/sdk'
import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { DamFile, getDamImageUrl } from '../../util/dam'

export interface SeoMetadataProps {
    readonly content?: BuilderContent
}

export const SeoMetadata: React.FC<SeoMetadataProps> = ({ content }) => {
    if (content === undefined) return null

    const description: null | string = content.data?.['description'] ?? null

    const keywords: string[] = content.data?.['keywords'] ?? []

    const openGraphTitle: null | string =
        content.data?.['openGraphTitle'] ?? null

    const openGraphDescription: null | string =
        content.data?.['openGraphDescription'] ?? null

    const openGraphImage: null | DamFile =
        content.data?.['openGraphDescription'] ?? null

    let robots = []

    if (content.data?.['noIndex'] === true) {
        robots.push('noindex')
    }

    if (content.data?.['noFollow'] === true) {
        robots.push('nofollow')
    }

    return (
        <Helmet>
            {description !== null && (
                <meta name='description' content={description} />
            )}
            {keywords.length > 0 && (
                <meta name='keywords' content={keywords?.join(',')} />
            )}
            {robots.length > 0 && (
                <meta name='robots' content={robots.join(',')} />
            )}
            {openGraphTitle !== null && (
                <meta property='og:title' content={openGraphTitle} />
            )}
            {openGraphDescription !== null && (
                <meta
                    property='og:description'
                    content={openGraphDescription}
                />
            )}
            {openGraphImage !== null && (
                <meta
                    property='og:image'
                    content={getDamImageUrl(openGraphImage)}
                />
            )}
        </Helmet>
    )
}
