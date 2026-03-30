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
                    primary: '#6FA8A3',   // soft-turquesa
                    secondary: '#DDEFEF', // niagra mist
                    accent: '#6B7C8C',    // celeb city
                    background: '#F5FAFA',
                    gold: '#C6A769'
                }
            }
        }
    }
})