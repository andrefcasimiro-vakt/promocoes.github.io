import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
         colors: {
            primary: string;
            primaryDark: string;
            secondary: string;
            secondaryDark: string;
            light: string;
         },
         fontSize: {
            default: string;
         },
         spacing: {
            extraSmall: string;
            small: string;
            medium: string;
            large: string;
         }
    }
}
