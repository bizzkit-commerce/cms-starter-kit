import { Builder, withChildren } from '@builder.io/react'
import smartDisplayIcon from '../../assets/smart_display.svg?raw'
import { DamVideo } from './DamVideo'

export const registerDamVideo = (): void => {
    Builder.registerComponent(withChildren(DamVideo), {
        name: 'DAMVideo',
        image: `data:image/svg+xml;base64,${btoa(smartDisplayIcon)}`,
        noWrap: true,
        canHaveChildren: true,

        inputs: [
            {
                name: 'video',
                type: 'Bizzkit DAM File',
                required: true,
            },
            {
                name: 'description',
                type: 'string',
                required: true,
            },
            {
                name: 'posterImage',
                type: 'Bizzkit DAM File',
                required: false,
            },
            {
                name: 'controls',
                type: 'boolean',
                defaultValue: true,
            },
            {
                name: 'autoPlay',
                type: 'boolean',
                defaultValue: false,
            },
            {
                name: 'loop',
                type: 'boolean',
                defaultValue: false,
            },
            {
                name: 'muted',
                type: 'boolean',
                defaultValue: true,
            },
            {
                name: 'videoFit',
                friendlyName: 'Fit video',
                type: 'string',
                defaultValue: 'cover',
                advanced: true,
                enum: [
                    {
                        label: 'contain',
                        value: 'contain',
                        helperText: 'The video should never get cropped',
                    },
                    {
                        label: 'cover',
                        value: 'cover',
                        helperText:
                            'The video should fill its container, cropping when needed',
                    },
                ],
            },
            {
                name: 'aspectRatio',
                type: 'number',
                helperText: `Height/width ratio, e.g. set to 1.5 for a 300px wide and 200px tall video. Set to 0 for video
							to maintain its natural aspect ratio`,
                defaultValue: 1.78,
                advanced: true,
                min: 0,
                max: 30,
            },
            {
                name: 'videoPosition',
                type: 'object',
                advanced: true,
                subFields: [
                    {
                        name: 'x',
                        friendlyName: 'Horizontal',
                        type: 'number',
                        helperText: `Horizontal position of the video within its container when cropped, e.g. set to 50 for
									center, 0 for left, 100 for right`,
                        defaultValue: 50,
                        min: 0,
                        max: 100,
                    },
                    {
                        name: 'y',
                        friendlyName: 'Vertical',
                        type: 'number',
                        helperText: `Vertical position of the video within its container when cropped, e.g. set to 50 for
									center, 0 for top, 100 for bottom`,
                        defaultValue: 50,
                        min: 0,
                        max: 100,
                    },
                ],
            },
        ],
    })
}
