export interface DamFile {
    readonly fileId: string
    readonly croppingId?: string | null
    readonly filePath?: string | null
}

export const getDamImageUrl = (
    image: DamFile,
    transformationId: string = '_original',
): string => {
    const damUrl = import.meta.env.VITE_DAM_URL
    const fileOrCroppingId = image.croppingId ?? image.fileId

    const fileName = encodeURIComponent(
        // Extract filename without extension from filePath
        image.filePath?.match(/([^/\.]+)\.?\w*$/)?.at(1) ?? 'image',
    )

    const url = new URL(
        `/${fileOrCroppingId}/${transformationId}/${fileName}.webp`,
        damUrl,
    )

    return url.href
}

export const getDamVideoUrl = (video: DamFile): string => {
    const damUrl = import.meta.env.VITE_DAM_URL

    const fileNameWithExtension = encodeURIComponent(
        // Extract filename with extension from filePath
        video.filePath?.match(/([^/]+)$/)?.at(1) ?? 'video.mp4',
    )

    const url = new URL(
        `/${video.fileId}/_original/${fileNameWithExtension}`,
        damUrl,
    )

    return url.href
}
