import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'goldenTheme',
        themes: {
            goldenTheme: {
                dark: false,
                colors: {
                    primary: '#75CED2',
                    secondary: '#C3E8F0',
                    accent: '#9D87AE',
                    background: '#FAF9F6',
                    surface: '#FFFFFF',
                    darkPurple: '#7B658B',
                    gold: '#A69675'
                }
            }
        }
    }
})