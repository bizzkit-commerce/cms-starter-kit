import { Builder, withChildren } from '@builder.io/react'
import photoIcon from '../../assets/photo.svg?raw'
import { DamImage } from './DamImage'

export const registerDamImage = (): void => {
    Builder.registerComponent(withChildren(DamImage), {
        name: 'DAMImage',
        image: `data:image/svg+xml;base64,${btoa(photoIcon)}`,
        noWrap: true,
        canHaveChildren: true,
        inputs: [
            {
                name: 'image',
                type: 'Bizzkit DAM File',
                required: true,
            },
            {
                name: 'altText',
                friendlyName: 'Alternate Text',
                type: 'string',
            },
            {
                name: 'lazyLoad',
                type: 'boolean',
                defaultValue: false,
                advanced: true,
                helperText:
                    'This is a performance optimization. Enable this only for images that are not immediately visible once the page loads.',
            },
            {
                name: 'imageFit',
                type: 'string',
                defaultValue: 'cover',
                advanced: true,
                enum: [
                    {
                        label: 'contain',
                        value: 'contain',
                        helperText: 'The image should never get cropped',
                    },
                    {
                        label: 'cover',
                        value: 'cover',
                        helperText:
                            'The image should fill its container, cropping when needed',
                    },
                ],
            },
            {
                name: 'aspectRatio',
                type: 'object',
                advanced: true,
                subFields: [
                    {
                        name: 'desktop',
                        type: 'number',
                        helperText:
                            'Width/height ratio. E.g.: Set to 1.5 for a 300px wide and 200px tall photo. Set to 0 for image to maintain its natural aspect ratio.',
                        defaultValue: 1.5,
                        min: 0,
                        max: 30,
                    },
                    {
                        name: 'tablet',
                        type: 'number',
                        helperText:
                            'Optional aspect ratio for tablet breakpoint. If unset, will use desktop size.',
                        min: 0,
                        max: 30,
                    },
                    {
                        name: 'mobile',
                        type: 'number',
                        helperText:
                            'Optional aspect ratio for mobile breakpoint. If unset, will use tablet size, or desktop size if tablet size is unset.',
                        min: 0,
                        max: 30,
                    },
                ],
            },
            {
                name: 'imagePosition',
                type: 'object',
                advanced: true,
                subFields: [
                    {
                        name: 'x',
                        friendlyName: 'Horizontal',
                        type: 'number',
                        helperText:
                            'Horizontal position of the image within its container when cropped, e.g. set to 50 for center, 0 for left, 100 for right',
                        defaultValue: 50,
                        min: 0,
                        max: 100,
                    },
                    {
                        name: 'y',
                        friendlyName: 'Vertical',
                        type: 'number',
                        helperText:
                            'Vertical position of the image within its container when cropped, e.g. set to 50 for center, 0 for top, 100 for bottom',
                        defaultValue: 50,
                        min: 0,
                        max: 100,
                    },
                ],
            },
        ],
    })
}
